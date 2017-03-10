export class InformationDialogParams {
    // Mouse event
    public event?: MouseEvent;
    // Confirm button caption
    public ok?: string;
    // Dialog title
    public title?: string; 
    // Dialog messag. You can use formatting options (%s, %d etc.). 
    public message: string;
    // Paramentrs for message string
    public item?: any;
}