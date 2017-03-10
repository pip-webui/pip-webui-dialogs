export class ErrorDialogParams {
    // Mouse event
    public event?: MouseEvent;
    // Confirm button caption
    public ok?: string = 'OK';
    // Cancel button caption
    public cancel?: string = 'CANCEL';
    // Error object or string
    public error: any = 'ERROR';
}