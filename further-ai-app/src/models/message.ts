export interface Message {
    text: string;
    isResponse: boolean;
    suggestions?: string[];
}