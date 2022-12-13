export interface Config {
    smtp: {
        username: string;
        password: string;
        host: string;
        port: number;
        tls?: boolean;
        fromAddress: string;
    };
}
