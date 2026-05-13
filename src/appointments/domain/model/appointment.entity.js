/**
 * It represents a medical or service appointment for a pet
 */
export class Appointment {
   /*
    *Create a new instance of a quote
    */
    constructor({
                    id = 0,
                    petName = '',
                    ownerName = '',
                    date = '',
                    time = '',
                    status = 'scheduled',
                    reason = '',
                    amount = 0
                }) {
        this.id = id;
        this.petName = petName;
        this.ownerName = ownerName;
        this.date = date;
        this.time = time;
        this.status = status || 'scheduled';
        this.reason = reason;
        this.amount = amount;
    }
}
