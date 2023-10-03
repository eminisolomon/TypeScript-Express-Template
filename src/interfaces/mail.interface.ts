export interface EmailOptions {
    service?: string;
    host?: string;
    port?: number;
    auth: {
        user: string;
        pass: string;
    };
}