import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DataProperty, Filter, FilterCategory } from 'utils-models';
import {
  Analyte,
  ChemicalEnrichment,
  Classes,
  CommonAnalyte,
  EntityCount,
  FisherResult,
  FishersDataframe,
  Metabolite,
  Ontology,
  OntologyEnrichment,
  Pathway,
  Properties,
  RampAPIResponse,
  RampChemicalEnrichmentAPIResponse,
  RampChemicalEnrichmentResponse,
  RampDataGeneric,
  RampOntologyEnrichmentAPIResponse,
  RampOntologyEnrichmentResponse,
  RampPathwayEnrichmentAPIResponse,
  RampPathwayEnrichmentResponse,
  RampReactionAPIResponse,
  RampReactionClassEnrichmentAPIResponse,
  RampReactionClassEnrichmentResponse,
  RampResponse,
  Reaction,
  ReactionClass,
  SourceVersion,
} from 'ramp';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const HTTP_OPTIONS = {
  headers: new HttpHeaders(),
  responseType: 'blob' as 'json',
};

const HTTP_TEXT_OPTIONS = {
  headers: new HttpHeaders(),
  responseType: 'text' as const,
};

@Injectable({
  providedIn: 'root',
})
export class RampService {
  private url!: string;
  private renderUrl!: string;
  private http = inject(HttpClient);
  private dom = inject(DOCUMENT);

  loadAboutData() {
    return forkJoin({
      sourceVersions: this.fetchSourceVersions(),
      entityCounts: this.fetchEntityCounts(),
      metaboliteIntersects: this.fetchMetaboliteIntersects(),
      geneIntersects: this.fetchGeneIntersects(),
      supportedIds: this.fetchSupportedIds(),
      databaseUrl: this.fetchDatabaseUrl(),
    });
  }

  fetchApi(url: string): Observable<{
    tags: { name: string; description: string }[];
    paths: { [key: string]: { post?: { [key: string]: unknown } | undefined } };
  }> {
    return this.http
      .get<{
        tags: { name: string; description: string }[];
        paths: {
          [key: string]: { post?: { [key: string]: unknown } | undefined };
        };
      }>(url)
      .pipe(
        map(
          (response: {
            tags: { name: string; description: string }[];
            paths: {
              [key: string]: { post?: { [key: string]: unknown } | undefined };
            };
          }) => {
            return response;
          },
        ),
      );
  }

  fetchSourceVersions(): Observable<SourceVersion[]> {
    return this.http
      .get<{ data: SourceVersion[] }>(`${this.url}source-versions`)
      .pipe(map((response: { data: SourceVersion[] }) => response.data));
  }

  fetchEntityCounts() {
    return this.http
      .get<{ data: { [p: string]: string }[] }>(`${this.url}entity-counts`) // ,{responseType: 'text'})
      .pipe(
        map((response: { data: { [p: string]: string }[] }) => {
          return response.data.map(
            (obj: { [p: string]: string | number }) => new EntityCount(obj),
          );
        }),
        catchError(this.handleError('fetchEntityCounts', [])),
      );
  }

  fetchSupportedIds(): Observable<
    { analyteType: string; idTypes: string[] }[]
  > {
    return this.http
      .get<{
        data: { analyteType: string; idTypes: string[] }[];
      }>(`${this.url}id-types`)
      .pipe(
        map((response) => {
          return response.data;
        }),
      );
  }

  fetchDatabaseUrl() {
    return this.http
      .get<{ data: string }>(`${this.url}current-db-file-url`)
      .pipe(map((response: { data: string }) => response.data));
  }

  fetchMetaboliteIntersects() {
    return this.fetchAnalyteIntersects('metabolites');
  }

  fetchGeneIntersects() {
    return this.fetchAnalyteIntersects('genes');
  }

  fetchAnalyteIntersects(param: string) {
    return this.http
      .get<{
        data: { id: string; sets: string[]; size: number }[];
      }>(
        `${this.url}analyte-intersects?analytetype=${param}&query_scope=global`,
      )
      .pipe(
        map(
          (response: {
            data: { id: string; sets: string[]; size: number }[];
          }) => response.data,
        ),
        catchError(this.handleError('fetchAnalyteIntersects', [])),
      );
  }

  fetchPathwaysFromAnalytes(
    analytes: string[],
  ): Observable<RampResponse<Pathway>> {
    const options = {
      analytes: analytes,
    };
    return this.http
      .post<RampAPIResponse<Pathway>>(
        `${this.url}pathways-from-analytes`,
        options,
      )
      .pipe(
        map((response: RampAPIResponse<Pathway>) => {
          const pathwayList: Pathway[] = response.data.map(
            (obj: Pathway) => new Pathway(obj),
          );
          return this._makeRampResponse(response, pathwayList, analytes);
        }),
      );
  }

  fetchAnalytesFromPathways(action: {
    pathways: string[];
    analyteType: string;
  }): Observable<RampResponse<Analyte>> {
    const options = {
      pathway: action.pathways,
      analyteType: action.analyteType,
    };
    return this.http
      .post<RampAPIResponse<Analyte>>(
        `${this.url}analytes-from-pathways`,
        options,
      )
      .pipe(
        map((response: RampAPIResponse<Analyte>) => {
          const analyteList = response.data.map(
            (obj: Partial<Analyte>) => new Analyte(obj),
          );
          return this._makeRampResponse(response, analyteList, action.pathways);
        }),
      );
  }

  fetchOntologiesFromMetabolites(
    analytes: string[],
  ): Observable<RampResponse<Ontology>> {
    const options = {
      metabolites: analytes,
    };
    return this.http
      .post<RampAPIResponse<Ontology>>(
        `${this.url}ontologies-from-metabolites`,
        options,
      )
      .pipe(
        map((response: RampAPIResponse<Ontology>) => {
          const ontologyList = response.data.map(
            (obj: unknown) => new Ontology(obj as { [key: string]: unknown }),
          );
          return this._makeRampResponse(response, ontologyList, analytes);
        }),
      );
  }

  fetchMetabolitesFromOntologies(
    ontologies: string[],
  ): Observable<RampResponse<Metabolite>> {
    const options = {
      ontology: ontologies,
    };
    return this.http
      .post<RampAPIResponse<Metabolite>>(
        `${this.url}metabolites-from-ontologies`,
        options,
      )
      .pipe(
        map((response: RampAPIResponse<Metabolite>) => {
          const metaboliteList = response.data.map(
            (obj: Partial<Metabolite>) => new Metabolite(obj),
          );
          return this._makeRampResponse(response, metaboliteList, ontologies);
        }),
      );
  }

  fetchOntologies(): Observable<{ data: FilterCategory[] }> {
    return this.http
      .get<{
        uniq_ontology_types: string[];
        data: Ontology[];
      }>(`${this.url}ontology-types`)
      .pipe(
        map((response: { uniq_ontology_types: string[]; data: Ontology[] }) => {
          const ontoMap: Map<string, FilterCategory> = new Map<
            string,
            FilterCategory
          >();
          response.uniq_ontology_types.forEach((onto: string) =>
            ontoMap.set(onto, new FilterCategory({ label: onto, values: [] })),
          );
          response.data.forEach((ontoType: Ontology) => {
            let cl: FilterCategory | undefined = ontoMap.get(
              ontoType.HMDBOntologyType,
            );
            if (cl) {
              cl.values.push(
                new Filter({
                  label: ontoType.commonName,
                  term: ontoType.commonName,
                  value: ontoType.commonName,
                  count: ontoType.metCount,
                }),
              );
            } else {
              cl = new FilterCategory({
                label: ontoType.HMDBOntologyType,
                values: [
                  new Filter({
                    label: ontoType.commonName,
                    term: ontoType.commonName,
                    value: ontoType.commonName,
                    count: ontoType.metCount,
                  }),
                ],
              });
            }
            ontoMap.set(ontoType.HMDBOntologyType, cl);
          });
          return {
            data: [...ontoMap.values()].map((fc) => new FilterCategory(fc)),
          };
        }),
      );
  }

  fetchEnrichmentFromOntologies(
    metabolites: string[],
    background?: string,
    backgroundFile?: File,
  ): Observable<RampOntologyEnrichmentResponse> {
    const formData = new FormData();
    formData.set('metabolites', JSON.stringify(metabolites));
    if (background) {
      formData.set('background', JSON.stringify([background]));
    }
    if (backgroundFile) {
      formData.set('backgroundFile', backgroundFile, backgroundFile.name);
    }
    return this.http
      .post<RampOntologyEnrichmentAPIResponse>(
        `${this.url}ontology-enrichment`,
        formData,
      )
      .pipe(
        map((response: RampOntologyEnrichmentAPIResponse) => {
          const enrichedOntologyList: OntologyEnrichment[] =
            response.data.fishertresults.map(
              (enrichedOntology: Partial<OntologyEnrichment>) =>
                new OntologyEnrichment(enrichedOntology),
            );

          const dataAsDataProperties =
            this._mapDataToDataProperty(enrichedOntologyList);
          return <RampOntologyEnrichmentResponse>{
            data: response.data.fishertresults,
            dataAsDataProperty: dataAsDataProperties,
            query: {
              functionCall: response.function_call
                ? response.function_call[0]
                : undefined,
            },
          };
        }),
      );
  }

  fetchMetabolitesFromOntologiesFile(ontologies: string[], format: string) {
    const params = {
      ontology: ontologies.join(','),
      format: format,
    };
    this.http
      .post<string[]>(
        `${this.url}metabolites-from-ontologies`,
        params,
        HTTP_OPTIONS,
      )
      .subscribe((response: unknown) => {
        this._downloadFile(
          response as Blob,
          'fetchMetabolitesFromOntologies-download.tsv',
        );
      });
  }

  fetchChemicalClass(
    metabolites: string[],
    background?: string,
    backgroundFile?: File,
  ): Observable<RampResponse<Classes>> {
    const formData = new FormData();
    formData.set('metabolites', JSON.stringify(metabolites));
    if (background) {
      formData.set('background', JSON.stringify([background]));
    }
    if (backgroundFile) {
      formData.set('backgroundFile', backgroundFile, backgroundFile.name);
    }
    return this.http
      .post<RampAPIResponse<Classes>>(`${this.url}chemical-classes`, formData)
      .pipe(
        map((response: RampAPIResponse<Classes>) => {
          const tempResponse: { [key: string]: unknown }[] = (<unknown>(
            response.data
          )) as { [key: string]: unknown }[];
          let metClasses: Classes[] = [];
          const metabMap: Map<string, { [key: string]: unknown }> = new Map<
            string,
            { [key: string]: unknown }
          >();
          if (response.data && response.data.length) {
            tempResponse.forEach((chClass: { [key: string]: unknown }) => {
              let cl = metabMap.get(<string>chClass['sourceId']);
              if (cl) {
                const clArr: { [key: string]: unknown }[] = cl[
                  'levels'
                ] as Array<{ [key: string]: unknown }>;
                clArr.push(chClass);
                cl['levels'] = clArr;
              } else {
                cl = { sourceId: chClass['sourceId'], levels: [chClass] };
              }
              metabMap.set(<string>chClass['sourceId'], cl);
            });
            metClasses = [...metabMap.values()].map(
              (obj: { [key: string]: unknown }) => new Classes(obj),
            );
          }
          return this._makeRampResponse(response, metClasses, metabolites);
        }),
      );
  }

  fetchPropertiesFromMetabolites(
    metabolites: string[],
  ): Observable<RampResponse<Properties>> {
    const options = {
      metabolites: metabolites,
    };
    return this.http
      .post<RampAPIResponse<Properties>>(
        `${this.url}chemical-properties`,
        options,
      )
      .pipe(
        map((response: RampAPIResponse<Properties>) => {
          const propertyList = response.data.map(
            (obj: Partial<Properties>) => new Properties(obj),
          );
          const propertyListAsDataProperty = this._makeRampResponse(
            response,
            propertyList,
            metabolites,
          );
          propertyListAsDataProperty?.dataAsDataProperty?.map((prop) => {
            prop['imageUrl'].url = `${this.renderUrl}(${encodeURIComponent(
              prop['iso_smiles'].value,
            )})?size=150`;
            prop['imageUrl'].label = prop['common_name'].value;
            return prop;
          });
          return propertyListAsDataProperty;
        }),
      );
  }

  fetchCommonReactionAnalytes(
    analytes: string[],
  ): Observable<RampResponse<CommonAnalyte>> {
    const options = {
      analytes: analytes,
    };
    return this.http
      .post<RampAPIResponse<CommonAnalyte>>(
        `${this.url}common-reaction-analytes`,
        options,
      )
      .pipe(
        map((response: RampAPIResponse<CommonAnalyte>) => {
          const commonAnalyteList = response.data.map(
            (obj: unknown) =>
              new CommonAnalyte(obj as { [key: string]: unknown }),
          );
          return this._makeRampResponse(response, commonAnalyteList, analytes);
        }),
      );
  }

  fetchReactionsFromAnalytes(
    analytes: string[],
    onlyHumanMets?: boolean,
    humanProtein?: boolean,
    includeTransportRxns?: boolean,
    rxnDirs?: string,
    includeRxnURLs?: boolean,
  ): Observable<RampResponse<Reaction>> {
    const options = {
      analytes: analytes,
      onlyHumanMets: onlyHumanMets,
      humanProtein: humanProtein,
      includeTransportRxns: includeTransportRxns,
      rxnDirs: rxnDirs,
      includeRxnURLs: includeRxnURLs,
    };
    return this.http
      .post<{
        data: {
          met2rxn: Reaction[];
          prot2rxn: Reaction[];
          metProteinCommonReactions: Reaction[];
        };
        function_call: string[];
        plot: { [key: string]: string[] };
      }>(`${this.url}reactions-from-analytes`, options)
      .pipe(
        map((response: RampReactionAPIResponse) => {
          const reactionList = response.data.met2rxn.map(
            (obj: unknown) => new Reaction(obj as Partial<Reaction>),
          );
          const plot = Object.keys(response.plot).map((level: string) => {
            const t = response.plot[level as keyof typeof response.plot];
            let r;
            if (Object.is(t, {})) {
              r = Array.from([]);
            } else {
              r = Array.from(t as []);
            }
            return {
              id: level,
              sets: [...new Set(r)],
              size: [...r].length,
            };
          });
          return this._makeRampResponse(
            {
              function_call: response.function_call,
              data: reactionList,
            } as RampAPIResponse<Reaction>,
            reactionList,
            analytes,
            plot,
          );
        }),
      );
  }

  fetchReactionClassesFromAnalytes(
    analytes: string[],
    multiRxnParticipantCount?: number,
    humanProtein?: boolean,
    concatResults?: boolean,
    includeReactionIDs?: string,
    useIdMapping?: boolean,
  ): Observable<RampResponse<ReactionClass>> {
    const options = {
      analytes: analytes,
      multiRxnParticipantCount: multiRxnParticipantCount,
      humanProtein: humanProtein,
      concatResults: concatResults,
      includeReactionIDs: includeReactionIDs,
      useIdMapping: useIdMapping,
    };
    return this.http
      .post<{
        data: ReactionClass[];
        function_call: string[];
      }>(`${this.url}reaction-classes-from-analytes`, options)
      .pipe(
        map((response: RampAPIResponse<ReactionClass>) => {
          const reactionClassList = response.data.map(
            (obj: unknown) => new ReactionClass(obj as Partial<ReactionClass>),
          );
          return this._makeRampResponse(response, reactionClassList, analytes);
        }),
      );
  }

  fetchEnrichmentFromReactionClasses(
    analytes: string[],
    background?: string,
    backgroundFile?: File,
  ): Observable<RampReactionClassEnrichmentResponse> {
    const formData = new FormData();
    formData.set('analytes', JSON.stringify(analytes));
    if (background) {
      formData.set('background', JSON.stringify([background]));
    }
    if (backgroundFile) {
      formData.set('backgroundFile', backgroundFile, backgroundFile.name);
    }
    return this.http
      .post<RampReactionClassEnrichmentAPIResponse>(
        `${this.url}reaction-class-enrichment`,
        formData,
      )
      .pipe(
        map((response: RampReactionClassEnrichmentAPIResponse) => {
          const reactionList: ReactionClass[] = [];
          response.data.EC_Level1Stats.forEach((reaction) =>
            reactionList.push(new ReactionClass(reaction)),
          );
          response.data.EC_Level2Stats.forEach((reaction) =>
            reactionList.push(new ReactionClass(reaction)),
          );
          const dataAsDataProperties =
            this._mapDataToDataProperty(reactionList);
          return <RampReactionClassEnrichmentResponse>{
            data: response.data,
            dataAsDataProperty: dataAsDataProperties,
            query: {
              functionCall: response.function_call
                ? response.function_call[0]
                : undefined,
            },
          };
        }),
      );
  }

  filterReactionClassEnrichment(
    dataframe: RampReactionClassEnrichmentResponse,
    pValType?: string,
    pValCutoff?: number,
  ): Observable<RampReactionClassEnrichmentResponse> {
    return this.http
      .post<RampReactionClassEnrichmentAPIResponse>(
        `${this.url}filter-enrichment-results`,
        {
          fishers_results: dataframe.data,
          pValType: pValType,
          pValCutoff: pValCutoff,
        },
      )
      .pipe(
        map((response: RampReactionClassEnrichmentAPIResponse) => {
          const reactionList: ReactionClass[] = [];
          response.data.EC_Level1Stats.forEach((reaction) =>
            reactionList.push(new ReactionClass(reaction)),
          );
          response.data.EC_Level2Stats.forEach((reaction) =>
            reactionList.push(new ReactionClass(reaction)),
          );
          const dataAsDataProperties =
            this._mapDataToDataProperty(reactionList);
          return <RampReactionClassEnrichmentResponse>{
            data: response.data,
            dataAsDataProperty: dataAsDataProperties,
            query: {
              functionCall: response.function_call
                ? response.function_call[0]
                : undefined,
            },
          };
        }),
      );
  }

  fetchReactionClassEnrichmentFile(data: ReactionClass[]) {
    this._downloadFile(
      this._makeBlob(this._toTSV(data)),
      'fetchReactionClassEnrichment-download.tsv',
    );
  }

  fetchEnrichmentFromMetabolites(
    metabolites: string[],
    background?: string,
    backgroundFile?: File,
  ): Observable<RampChemicalEnrichmentResponse> {
    const formData = new FormData();
    formData.set('metabolites', JSON.stringify(metabolites));
    if (background) {
      formData.set('background', JSON.stringify([background]));
    }
    if (backgroundFile) {
      formData.set('backgroundFile', backgroundFile, backgroundFile.name);
    }
    return this.http
      .post<RampChemicalEnrichmentAPIResponse>(
        `${this.url}chemical-class-enrichment`,
        formData,
      )
      .pipe(
        map((response: RampChemicalEnrichmentAPIResponse) => {
          const retList: ChemicalEnrichment[] = [];
          const responseClone = response.data;
          //  delete responseClone.result_type;
          [...Object.values(responseClone)].forEach((val: unknown[]) => {
            if (typeof val[0] !== 'string') {
              val.forEach((cc: unknown) => {
                retList.push(
                  new ChemicalEnrichment(cc as { [key: string]: unknown }),
                );
              });
            }
          });
          const dataAsDataProperties = this._mapDataToDataProperty(retList);
          return {
            data: response,
            enriched_chemical_class_list: retList,
            dataAsDataProperty: dataAsDataProperties,
            query: {
              functionCall: response.function_call
                ? response.function_call[0]
                : undefined,
            },
          } as RampChemicalEnrichmentResponse;
        }),
      );
  }

  filterMetaboliteEnrichment(
    dataframe: RampChemicalEnrichmentResponse,
    pValType?: string,
    pValCutoff?: number,
  ) {
    return this.http
      .post<RampChemicalEnrichmentAPIResponse>(
        `${this.url}filter-enrichment-results`,
        {
          fishers_results: dataframe.data,
          pValType: pValType,
          pValCutoff: pValCutoff,
        },
      )
      .pipe(
        map((response: RampChemicalEnrichmentAPIResponse) => {
          const retList: ChemicalEnrichment[] = [];
          [...Object.values(response.data)].forEach((val: unknown[]) => {
            return val.forEach((cc: unknown) => {
              if (cc != 'chemical_class_enrichment')
                retList.push(
                  new ChemicalEnrichment(cc as { [key: string]: unknown }),
                );
            });
          });
          const dataAsDataProperties = this._mapDataToDataProperty(retList);
          return {
            data: response.data,
            enriched_chemical_class_list: retList,
            dataAsDataProperty: dataAsDataProperties,
            query: {
              functionCall: response.function_call
                ? response.function_call[0]
                : undefined,
            },
          } as RampChemicalEnrichmentResponse;
        }),
      );
  }

  fetchEnrichmentFromMetabolitesFile(data: ChemicalEnrichment[]) {
    this._downloadFile(
      this._makeBlob(this._toTSV(data)),
      'fetchEnrichmentFromMetabolites-download.tsv',
    );
  }

  fetchEnrichmentFromPathways(
    analytes: string[],
    background?: string,
    backgroundFile?: File,
    dataSourceExclusion?: string[],
  ): Observable<RampPathwayEnrichmentResponse> {
    const formData = new FormData();
    formData.set('analytes', JSON.stringify(analytes));
    if (background) {
      formData.set('background', JSON.stringify([background]));
    }
    if (dataSourceExclusion) {
      formData.set('dataSourceExclusion', JSON.stringify(dataSourceExclusion));
    }
    if (backgroundFile) {
      formData.set('file', backgroundFile, backgroundFile.name);
    }
    return this.http
      .post<RampPathwayEnrichmentAPIResponse>(
        `${this.url}pathway-enrichment`,
        formData,
      )
      .pipe(
        map((response: RampPathwayEnrichmentAPIResponse) =>
          this._makeRampPathwayEnrichmentResponse(response),
        ),
      );
  }

  filterPathwayEnrichment(
    dataframe: FishersDataframe,
    pValType?: string,
    pValCutoff?: number,
  ): Observable<RampPathwayEnrichmentResponse> {
    return this.http
      .post<RampPathwayEnrichmentAPIResponse>(
        `${this.url}filter-enrichment-results`,
        {
          fishers_results: dataframe,
          pValType: pValType,
          pValCutoff: pValCutoff,
        },
      )
      .pipe(
        map((response: RampPathwayEnrichmentAPIResponse) =>
          this._makeRampPathwayEnrichmentResponse(response),
        ),
      );
  }

  getClusteredData(
    dataframe: FishersDataframe,
    percAnalyteOverlap?: number,
    minPathwayToCluster?: number,
    percPathwayOverlap?: number,
  ): Observable<{
    data: RampPathwayEnrichmentResponse;
    plotUrl: string | undefined;
  }> {
    return forkJoin({
      data: this.clusterPathwayEnrichment(
        dataframe,
        percAnalyteOverlap,
        minPathwayToCluster,
        percPathwayOverlap,
      ),
      plotUrl: this.fetchClusterPlotUrl(
        dataframe,
        percAnalyteOverlap,
        minPathwayToCluster,
        percPathwayOverlap,
      ),
    });
  }

  clusterPathwayEnrichment(
    dataframe: FishersDataframe,
    percAnalyteOverlap?: number,
    minPathwayToCluster?: number,
    percPathwayOverlap?: number,
  ): Observable<RampPathwayEnrichmentResponse> {
    return this.http
      .post<RampPathwayEnrichmentAPIResponse>(
        `${this.url}cluster-enrichment-results`,
        {
          fishers_results: dataframe,
          percAnalyteOverlap: percAnalyteOverlap,
          minPathwayToCluster: minPathwayToCluster,
          percPathwayOverlap: percPathwayOverlap,
        },
      )
      .pipe(
        map((response: RampPathwayEnrichmentAPIResponse) =>
          this._makeRampPathwayEnrichmentResponse(response),
        ),
      );
  }

  fetchClusterPlotUrl(
    dataframe: FishersDataframe,
    percAnalyteOverlap?: number,
    minPathwayToCluster?: number,
    percPathwayOverlap?: number,
  ): Observable<string | undefined> {
    if (!dataframe.fishresults || dataframe.fishresults.length >= 125) {
      return of(undefined);
    } else {
      const body = {
        fishers_results: dataframe,
        textSize: 8,
        percAnalyteOverlap: percAnalyteOverlap,
        minPathwayToCluster: minPathwayToCluster,
        percPathwayOverlap: percPathwayOverlap,
        filename: Date.now() + '.svg',
      };
      return this.http
        .post(`${this.url}cluster-plot`, body, HTTP_TEXT_OPTIONS)
        .pipe(
          map((response: string) => {
            return URL.createObjectURL(
              this._makeBlob([<string>response], 'image/svg+xml'),
            );
          }),
        );
    }
  }

  fetchClusterImageFile(data: string) {
    this._downloadFile(
      this._makeBlob([data], 'image/svg+xml'),
      'fetchClusterImageFile-download.svg',
    );
  }

  runIdentifierHarmonization(files: File[], manifest: File) {
    const formData: FormData = new FormData();
    files.forEach((file) => {
      formData.append('inputFiles', file);
    });
    formData.append('manifestFile', manifest, manifest.name);
    return this.http
      .post(`${this.url}metlinkr`, formData, { responseType: 'blob' })
      .pipe(
        map((response: Blob) => {
          this._downloadFile(response, 'metlinkR_results.tar.gz');
        }),
      );
  }

  private _mapDataToDataProperty<T extends RampDataGeneric>(
    data: T[],
  ): { [p: string]: DataProperty }[] {
    return data.map((obj: T) => {
      const newObj: { [key: string]: DataProperty } = {};
      Object.entries(obj).map((value: string[]) => {
        newObj[value[0]] = new DataProperty({
          label: value[0],
          value: value[1],
        });
      });
      return newObj;
    });
  }

  _makeRampResponse<T extends RampDataGeneric>(
    apiResponse: RampAPIResponse<T>,
    dataList: T[],
    inputList: string[],
    plot?: { id: string; sets: string[]; size: number }[],
  ) {
    const matches = Array.from(
      new Set(dataList.map((data) => data.id.toLocaleLowerCase())),
    );
    const noMatches = inputList.filter(
      (p: string) => !matches.includes(p.toLocaleLowerCase()),
    );
    return {
      data: dataList,
      query: {
        functionCall: apiResponse.function_call[0],
        matches: matches.length,
        noMatches: noMatches,
        inputType: '',
      },
      plot: plot,
      dataAsDataProperty: this._mapDataToDataProperty(dataList),
    } as RampResponse<T>;
  }

  _makeRampPathwayEnrichmentResponse(
    apiResponse: RampPathwayEnrichmentAPIResponse,
  ) {
    const enrichedPathwayList = apiResponse.data.fishresults.map(
      (obj: Partial<FisherResult>) => new FisherResult(obj),
    );

    const matches = Array.from(
      new Set(
        enrichedPathwayList.map((data) => data.pathwayId.toLocaleLowerCase()),
      ),
    );
    /*   const noMatches = inputList.filter(
      (p: string) => !matches.includes(p.toLocaleLowerCase())
    )*/

    return {
      data: enrichedPathwayList,
      combinedFishersDataframe: apiResponse.data as FishersDataframe,
      filteredFishersDataframe: apiResponse.data as FishersDataframe,
      query: {
        functionCall: apiResponse.function_call
          ? apiResponse.function_call[0]
          : undefined,
        matches: matches.length,
      },
      dataAsDataProperty: this._mapDataToDataProperty(enrichedPathwayList),
    } as RampPathwayEnrichmentResponse;
  }

  private _toTSV<T extends RampDataGeneric>(data: unknown[]): string[] {
    const headings: string = Object.keys(data[0] as string[]).join('\t');
    const rows: string[] = <string[]>(<unknown>data
      .reduce(
        (acc: string[], c: unknown) => {
          const vals = Object.values(c as T);
          const row = vals.join('\t');
          return acc.concat(row);
        },
        [headings],
      )
      .join('\n'));
    return rows;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: ErrorEvent): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  _setUrl(url: string): void {
    this.url = url;
  }

  _setRendererUrl(url: string): void {
    this.renderUrl = url;
  }

  private _makeBlob(data: string[], type = 'text/tsv'): Blob {
    return new Blob([...data], { type: type });
  }

  private _downloadFile(blob: Blob, name: string) {
    const link = this.dom.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${name}`);
      link.style.visibility = 'hidden';
      this.dom.body.appendChild(link);
      link.click();
      this.dom.body.removeChild(link);
    }
  }
}
