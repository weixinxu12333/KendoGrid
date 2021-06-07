export class BaseDto {
    id: number;
    uniqueIdentifier: string;
    rowVersion: string;

    constructor() {
        this.id = undefined;
    }
}
