export interface Config {
    version: string;
    //backendType: BackendType;
    restPathRoot: string;
    //restServiceRoot: string;
    //loadExternalConfig: boolean;    
  }
  
  export const config: Config = {
    version: 'dev',
    //backendType: BackendType.REST,
    restPathRoot: 'http://localhost:8081',
    //restServiceRoot: 'http://localhost:8081/mythaistar/services/rest/',
    //loadExternalConfig: false, // load external configuration on /config endpoint    
  };