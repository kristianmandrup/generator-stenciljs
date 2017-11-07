// export { IDataServiceInjector } from '../_common'

export interface IDataServiceInjector {
    create(): Promise<DataService>
}

export interface I${className}DataService {
    getData();
}

export class ${className}DataService implements I${className}DataService{
    getData() {
        return ['data1', 'data2'];
    }
}
