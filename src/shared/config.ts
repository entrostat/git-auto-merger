export interface Config {
    smtp: {
        username: string;
        password: string;
        host?: string;
        port: number | string;
        tls: boolean;
    };
}
