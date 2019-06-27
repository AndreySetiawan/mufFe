import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { createRequestOption } from 'app/shared';
import { map } from 'rxjs/operators';
import { ITask } from 'app/shared/model/task.model';

export class AbstractEntityService<T> {
    private lastReadCache: Date;
    private caches: T[];
    protected cacheTTL: number;

    public values: Subject<T[]>;
    protected resourceUrl: string;
    protected resourceSearchUrl: string;

    constructor(protected http: HttpClient) {
        this.values = new Subject<T[]>();
        this.lastReadCache = new Date();
        this.cacheTTL = 30;
    }

    protected preSave(entity: T) {}

    create(entity: T): Observable<HttpResponse<T>> {
        this.preSave(entity);
        return this.http.post<T>(this.resourceUrl, entity, { observe: 'response' });
    }

    update(entity: T): Observable<HttpResponse<T>> {
        this.preSave(entity);
        return this.http.put<T>(this.resourceUrl, entity, { observe: 'response' });
    }

    find(id): Observable<HttpResponse<T>> {
        return this.http
            .get<T>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: HttpResponse<T>) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<HttpResponse<T[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<T[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: HttpResponse<T[]>) => this.convertDateArrayFromServer(res)));
    }

    delete(id): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<T[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<T[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: HttpResponse<T[]>) => this.convertDateArrayFromServer(res)));
    }

    queryFilterBy(req?: any): Observable<HttpResponse<T[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<T[]>(this.resourceUrl + '/filterBy', { params: options, observe: 'response' })
            .pipe(map((res: HttpResponse<T[]>) => this.convertDateArrayFromServer(res)));
    }

    process(maps?: any, req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http.post<any>(`${this.resourceUrl}/process`, maps, { params: options, observe: 'response' });
    }

    changeStatus(entity: T): Observable<HttpResponse<T>> {
        return this.process(entity, { processName: 'changeEntityStatus' });
    }

    cancelEntity(entity: T): Observable<HttpResponse<T>> {
        return this.process(entity, { processName: 'cancelEntity' });
    }

    protected convertDateFromServer(res: HttpResponse<T>): HttpResponse<T> {
        return res;
    }

    protected convertDateArrayFromServer(res: HttpResponse<T[]>): HttpResponse<T[]> {
        return res;
    }

    getFilterBy(req?: any): Promise<T> {
        // let result: T;
        const promise = new Promise<T>(resolve => {
            let value: T;
            // force return value only one
            req.size = 1;
            this.queryFilterBy(req).subscribe(items => {
                if (items.body.length > 0) {
                    value = items.body[0];
                } else {
                    value = null;
                }
                resolve(value);
            });
        });
        return promise;
    }

    getAll(): Promise<T[]> {
        const minutes: number = (new Date().valueOf() - this.lastReadCache.valueOf()) / 1000 / 60;
        const promise = new Promise<T[]>((resolve, reject) => {
            if (this.caches && minutes < this.cacheTTL) {
                resolve(this.caches);
            }

            this.query({ size: 9999 })
                .toPromise()
                .then(r => {
                    this.lastReadCache = new Date();
                    this.caches = r.body;
                    resolve(r.body);
                });
        });
        return promise;
    }

    pushItems(items: T[]) {
        this.values.next(items);
    }

    uploadFile(fileName?: FormData, microservice?: string, paramHeaders?: HttpHeaders) {
        const url = microservice ? `/${microservice}/api/uploadFile` : `/api/uploadFile`;
        return this.http.post<any>(url, fileName, { headers: paramHeaders, observe: 'response' });
    }

    downloadFile(fileName?: string, microservice?: string, paramHeaders?: HttpHeaders) {
        const url = microservice ? `/${microservice}/api/downloadFile/${fileName}` : `/api/downloadFile/${fileName}`;
        return this.http.get(url, {
            responseType: 'blob',
            headers: paramHeaders,
            observe: 'response'
        });
    }

    getTasks(id: any): Observable<HttpResponse<ITask[]>> {
        return this.http.get<ITask[]>(`${this.resourceUrl}/tasks/${id}`, { observe: 'response' });
    }

    processTask(task: ITask): Observable<HttpResponse<T>> {
        return this.process(task, { processName: 'doTask' });
    }
}
