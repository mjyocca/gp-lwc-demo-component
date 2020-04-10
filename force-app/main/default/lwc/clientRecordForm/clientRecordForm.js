import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ClientRecordForm extends LightningElement {

    /* @api exposed to external components and app code */
    @api recordId;
    @api sObjectName;
    @api mode;
    @api layout;
    @api columns;

    /* invoked in the lifecycle when its attached to the document */
    connectedCallback() {}

    successHandler(event) {
        // fire toast
        this.dispatchEvent(new ShowToastEvent({
            variant: 'success',
            title: 'Success: ',
            message: `${this.sObjectName} was saved.`
        }))
        // fire closeModal class function 
        this.closeModal();
    }

    errorHandler(event) {
        const { message } = event.detail;
        this.dispatchEvent(new ShowToastEvent({
            variant: 'error',
            title: 'Error: ',
            message
        }))
    }

    closeModal() {
        console.log('closeModal')
        // delay firing notification to geopointe map page to close modal
        setTimeout(() => {
            // dispatching custom event geopointe__action
            this.dispatchEvent(new CustomEvent('geopointe__action', {
                detail: {
                    type: 'close'
                }
            }));
        }, 500)
    }

    /* called if there was an issue in the lifecycle of component */
    errorCallback(err){
        console.log('ClientRecordForm Lightning Component Ran into an Error: ' + err);
    }

    // called when removed from document
    /* disconnectedCallback() {} */

}