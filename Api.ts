/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface WidgetInterface {
  /** @format double */
  id: number
  name: string
  settings: string

  /** @format double */
  x: number

  /** @format double */
  y: number

  /** @format double */
  width: number

  /** @format double */
  height: number

  /** @format double */
  dashboardId: number
  [key: string]: any
}

export interface DashboardInterface {
  /** @format double */
  id: number
  name: string
  createdBy: string
  widgets: WidgetInterface[]
  [key: string]: any
}

export interface DashboardInterfaceForCreate {
  name: string
  createdBy: string
  [key: string]: any
}

export interface UserInterfaceForFrontend {
  /** @format double */
  id: number
  username: string
  role: 'Admin' | 'Operator' | 'AGV-T2000'
  [key: string]: any
}

export interface UserInterfaceForLogin {
  username: string
  password: string
  [key: string]: any
}

export interface MoveInterface {
  /** @format double */
  robotId: number

  /** @format double */
  vx: number

  /** @format double */
  vth: number
  [key: string]: any
}

export interface MapInterface {
  /** @format double */
  id: number
  name: string

  /** @format double */
  originX: number

  /** @format double */
  originY: number

  /** @format double */
  resolution: number

  /** @format double */
  width: number

  /** @format double */
  height: number
  baseLayer: any
  editLayer: any
  [key: string]: any
}

export interface RobotTypeInterface {
  /** @format double */
  id: number
  name: string
  robots: RobotInterface[]
  missions: MissionInterface[]
  [key: string]: any
}

export interface RobotInterface {
  /** @format double */
  id: number
  name: string
  ip: string
  footprint: any

  /** @format double */
  height: number

  /** @format double */
  robotTypeId: number
  robotType: RobotTypeInterface

  /** @format double */
  mapId: number
  map: MapInterface
  [key: string]: any
}

export interface MissionInterface {
  /** @format double */
  id: number
  name: string
  xml: string
  js: string

  /** @format double */
  robotTypeId: number
  robotType: RobotTypeInterface
  [key: string]: any
}

export interface MissionInterfaceForCreate {
  name: string
  robotTypeName: string
  [key: string]: any
}

export interface MissionInterfaceForSave {
  xml: string
  js: string
  [key: string]: any
}

export interface PositionInterface {
  /** @format double */
  id: number
  name: string

  /** @format double */
  x: number

  /** @format double */
  y: number

  /** @format double */
  orientation: number

  /** @format double */
  mapId: number
  [key: string]: any
}

export interface PositionAddInterface {
  name: string

  /** @format double */
  x: number

  /** @format double */
  y: number

  /** @format double */
  orientation: number

  /** @format double */
  mapId: number
  [key: string]: any
}

export interface PositionEditInterface {
  name?: string

  /** @format double */
  x?: number

  /** @format double */
  y?: number

  /** @format double */
  orientation?: number

  /** @format double */
  mapId?: number
  [key: string]: any
}

export interface RobotTypeInterfaceForCreate {
  name: string
  [key: string]: any
}

export interface UserInterfaceForCreate {
  username: string
  password: string
  role: 'Admin' | 'Operator' | 'AGV-T2000'
  [key: string]: any
}

export interface UserInterfaceForEdit {
  username: string
  password: string
  role: string
  [key: string]: any
}

export interface WidgetInterfaceForSave {
  /** @format double */
  x: number

  /** @format double */
  y: number

  /** @format double */
  width: number

  /** @format double */
  height: number
  [key: string]: any
}

export interface WidgetInterfaceForSaveSettings {
  settings: string
  [key: string]: any
}

export interface WidgetInterfaceForCreate {
  name: string
  settings: string

  /** @format double */
  x: number

  /** @format double */
  y: number

  /** @format double */
  width: number

  /** @format double */
  height: number

  /** @format double */
  dashboardId: number
  [key: string]: any
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = 'http://localhost:3000/api'
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(
      typeof value === 'number' ? value : `${value}`
    )}`
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter(
      (key) => 'undefined' !== typeof query[key]
    )
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`
        )
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  }

  private mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  private createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${
        queryString ? `?${queryString}` : ''
      }`,
      {
        ...requestParams,
        headers: {
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
          ...(requestParams.headers || {}),
        },
        signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch((e) => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title agv-master-backend
 * @version 1.0.0
 * @license ISC
 * @baseUrl http://localhost:3000/api
 * @contact
 *
 * agv-master-backend
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  dashboard = {
    /**
     * No description
     *
     * @name GetDashboards
     * @request GET:/dashboard
     * @secure
     */
    getDashboards: (params: RequestParams = {}) =>
      this.request<DashboardInterface[], any>({
        path: `/dashboard`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name AddDashboard
     * @request POST:/dashboard
     * @secure
     */
    addDashboard: (
      data: DashboardInterfaceForCreate,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/dashboard`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name GetDashboard
     * @request GET:/dashboard/{id}
     * @secure
     */
    getDashboard: (id: number, params: RequestParams = {}) =>
      this.request<DashboardInterface | null, any>({
        path: `/dashboard/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteDashboard
     * @request DELETE:/dashboard/{id}
     * @secure
     */
    deleteDashboard: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/dashboard/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  }
  login = {
    /**
     * No description
     *
     * @name LogUser
     * @request POST:/login
     */
    logUser: (data: UserInterfaceForLogin, params: RequestParams = {}) =>
      this.request<UserInterfaceForFrontend, { name: string }>({
        path: `/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name GetCurrentUser
     * @request GET:/login
     */
    getCurrentUser: (params: RequestParams = {}) =>
      this.request<UserInterfaceForFrontend | null, any>({
        path: `/login`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name LogOut
     * @request DELETE:/login
     */
    logOut: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/login`,
        method: 'DELETE',
        ...params,
      }),
  }
  manual = {
    /**
     * No description
     *
     * @name SetSpeed
     * @request POST:/manual
     */
    setSpeed: (data: MoveInterface, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/manual`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  }
  maps = {
    /**
     * No description
     *
     * @name GetAllMapsNamesAndIds
     * @request GET:/maps
     */
    getAllMapsNamesAndIds: (params: RequestParams = {}) =>
      this.request<{ name: string; id: number }[], any>({
        path: `/maps`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name GetMap
     * @request GET:/maps/{id}
     */
    getMap: (id: number, params: RequestParams = {}) =>
      this.request<MapInterface, string>({
        path: `/maps/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteMap
     * @request DELETE:/maps/{id}
     */
    deleteMap: (id: number, params: RequestParams = {}) =>
      this.request<void, string>({
        path: `/maps/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @name ChangeName
     * @request PATCH:/maps/changeName/{id}
     */
    changeName: (
      id: number,
      data: { name: string },
      params: RequestParams = {}
    ) =>
      this.request<void, string>({
        path: `/maps/changeName/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name UpdateEditLayer
     * @request PATCH:/maps/updateEditLayer/{id}
     */
    updateEditLayer: (
      id: number,
      data: { layer: string },
      params: RequestParams = {}
    ) =>
      this.request<void, string>({
        path: `/maps/updateEditLayer/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  }
  mission = {
    /**
     * No description
     *
     * @name GetMissions
     * @request GET:/mission
     * @secure
     */
    getMissions: (params: RequestParams = {}) =>
      this.request<MissionInterface[], any>({
        path: `/mission`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name AddMission
     * @request POST:/mission
     * @secure
     */
    addMission: (data: MissionInterfaceForCreate, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/mission`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name GetMission
     * @request GET:/mission/{id}
     * @secure
     */
    getMission: (id: number, params: RequestParams = {}) =>
      this.request<MissionInterface | null, any>({
        path: `/mission/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name SaveMission
     * @request PATCH:/mission/{id}
     * @secure
     */
    saveMission: (
      id: number,
      data: MissionInterfaceForSave,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/mission/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteMission
     * @request DELETE:/mission/{id}
     * @secure
     */
    deleteMission: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/mission/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name Stop
     * @request PATCH:/mission/{id}/stop
     * @secure
     */
    stop: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/mission/${id}/stop`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),

    /**
     * @description kills mission. FIRST USE STOP MISSION, otherwise robot might not stop moving
     *
     * @name Kill
     * @request PATCH:/mission/{id}/kill
     * @secure
     */
    kill: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/mission/${id}/kill`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),

    /**
     * @description Sets mission state to 'paused'
     *
     * @name Pause
     * @request PATCH:/mission/{id}/pause
     * @secure
     */
    pause: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/mission/${id}/pause`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),

    /**
     * @description Sets mission state to 'running'
     *
     * @name Resume
     * @request PATCH:/mission/{id}/resume
     * @secure
     */
    resume: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/mission/${id}/resume`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),
  }
  position = {
    /**
     * No description
     *
     * @name GetPositions
     * @request GET:/position
     * @secure
     */
    getPositions: (params: RequestParams = {}) =>
      this.request<PositionInterface[], any>({
        path: `/position`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name AddPosition
     * @request POST:/position
     * @secure
     */
    addPosition: (data: PositionAddInterface, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/position`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name GetPositionsByMapId
     * @request GET:/position/{id}
     * @secure
     */
    getPositionsByMapId: (id: number, params: RequestParams = {}) =>
      this.request<PositionInterface[], any>({
        path: `/position/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UpdatePosition
     * @request PUT:/position/{id}
     * @secure
     */
    updatePosition: (
      id: number,
      data: PositionEditInterface,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/position/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name DeletePosition
     * @request DELETE:/position/{id}
     * @secure
     */
    deletePosition: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/position/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  }
  queue = {
    /**
     * No description
     *
     * @name AddToQueue
     * @request PATCH:/queue/{id}
     * @secure
     */
    addToQueue: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/queue/${id}`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name RemoveFromQueue
     * @request DELETE:/queue/{index}
     * @secure
     */
    removeFromQueue: (index: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/queue/${index}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name MoveOneUp
     * @request PATCH:/queue/moveOneUp/{index}
     * @secure
     */
    moveOneUp: (index: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/queue/moveOneUp/${index}`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name MoveOneDown
     * @request PATCH:/queue/moveOneDown/{index}
     * @secure
     */
    moveOneDown: (index: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/queue/moveOneDown/${index}`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name MoveToBegin
     * @request PATCH:/queue/moveToBegin/{index}
     * @secure
     */
    moveToBegin: (index: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/queue/moveToBegin/${index}`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name MoveToEnd
     * @request PATCH:/queue/moveToEnd/{index}
     * @secure
     */
    moveToEnd: (index: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/queue/moveToEnd/${index}`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),
  }
  robot = {
    /**
     * No description
     *
     * @name GetRobots
     * @request GET:/robot
     */
    getRobots: (params: RequestParams = {}) =>
      this.request<RobotInterface[], any>({
        path: `/robot`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name GetRobot
     * @request GET:/robot/{id}
     */
    getRobot: (id: number, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/robot/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name RemoveRobot
     * @request DELETE:/robot/{id}
     */
    removeRobot: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/robot/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @name GetRobotState
     * @request GET:/robot/{id}/state
     */
    getRobotState: (id: number, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/robot/${id}/state`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name SetModeToMapping
     * @request PATCH:/robot/{id}/setModeToMapping
     */
    setModeToMapping: (id: number, params: RequestParams = {}) =>
      this.request<void, string>({
        path: `/robot/${id}/setModeToMapping`,
        method: 'PATCH',
        ...params,
      }),

    /**
     * No description
     *
     * @name SetModeToNormal
     * @request PATCH:/robot/{id}/setModeToNormal
     */
    setModeToNormal: (id: number, params: RequestParams = {}) =>
      this.request<void, string>({
        path: `/robot/${id}/setModeToNormal`,
        method: 'PATCH',
        ...params,
      }),

    /**
     * No description
     *
     * @name ChangeMap
     * @request PATCH:/robot/{id}/changeMap
     */
    changeMap: (
      id: number,
      data: { mapId: number },
      params: RequestParams = {}
    ) =>
      this.request<void, string>({
        path: `/robot/${id}/changeMap`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  }
  robotTypes = {
    /**
     * No description
     *
     * @name GetRobotTypes
     * @request GET:/robotTypes
     * @secure
     */
    getRobotTypes: (params: RequestParams = {}) =>
      this.request<RobotTypeInterface[], any>({
        path: `/robotTypes`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name AddRobotType
     * @request POST:/robotTypes
     * @secure
     */
    addRobotType: (
      data: RobotTypeInterfaceForCreate,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/robotTypes`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name RemoveRobot
     * @request DELETE:/robotTypes/{id}
     * @secure
     */
    removeRobot: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/robotTypes/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  }
  users = {
    /**
     * No description
     *
     * @name GetUsers
     * @request GET:/users
     * @secure
     */
    getUsers: (params: RequestParams = {}) =>
      this.request<UserInterfaceForFrontend[], any>({
        path: `/users`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name AddUser
     * @request POST:/users
     * @secure
     */
    addUser: (data: UserInterfaceForCreate, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name EditUser
     * @request PATCH:/users/{id}
     * @secure
     */
    editUser: (
      id: number,
      data: UserInterfaceForEdit,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/users/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name RemoveUser
     * @request DELETE:/users/{id}
     */
    removeUser: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}`,
        method: 'DELETE',
        ...params,
      }),
  }
  widget = {
    /**
     * No description
     *
     * @name GetWidgets
     * @request GET:/widget
     * @secure
     */
    getWidgets: (params: RequestParams = {}) =>
      this.request<WidgetInterface[], any>({
        path: `/widget`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name AddWidget
     * @request POST:/widget
     * @secure
     */
    addWidget: (data: WidgetInterfaceForCreate, params: RequestParams = {}) =>
      this.request<WidgetInterface, any>({
        path: `/widget`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name GetWidget
     * @request GET:/widget/{id}
     * @secure
     */
    getWidget: (id: number, params: RequestParams = {}) =>
      this.request<WidgetInterface | null, any>({
        path: `/widget/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name SavePosition
     * @request PATCH:/widget/{id}
     * @secure
     */
    savePosition: (
      id: number,
      data: WidgetInterfaceForSave,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/widget/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name SaveSettings
     * @request PUT:/widget/{id}
     * @secure
     */
    saveSettings: (
      id: number,
      data: WidgetInterfaceForSaveSettings,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/widget/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteWidget
     * @request DELETE:/widget/{id}
     * @secure
     */
    deleteWidget: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/widget/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  }
}
