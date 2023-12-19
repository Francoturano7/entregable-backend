import { ticketsModel } from '../models/tickets.model.js';
import { logger } from '../../helpers/logger.js';

export class TicketsManagerMongo{
    constructor(){
        this.model = ticketsModel;
    };

    // Obtener Tickets
    async getTickets(){
        try {
            const result = await this.model.find().lean();
            return result;
        } catch (error) {
            logger.error("getTickets: ", error.message);
            throw new Error("Se produjo un error al obtener los tickets");
        }
    };

    // Obtener Tickets por ID
    async getTicketById(ticketId){
        try {
            const result = await this.model.findById(ticketId).lean();
            // El lean() cambia de BSON a JSON
            return result;
        } catch (error) {
            logger.error("getTicketById: ", error.message);
            throw new Error("Se produjo un error obteniendo el ticket por ID");
        }
    };

        // Crear Ticket
    async createTicket(ticketInfo){
        try {
            const result = await this.model.create(ticketInfo);
            return result;
        } catch (error) {
            logger.error("createTicket: ", error.message);
            throw new Error("Se produjo un error al crear el ticket");
        }
    };
    
    
}