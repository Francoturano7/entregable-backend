import { ticketsDao } from "../dao/index.js";

export class TicketsService{
    // Obtener Tickets
    static getTickets(){
        return ticketsDao.getTickets();
    };

    // Obtener Ticket por ID
    static getTicketById(ticketId){
        return ticketsDao.getTicketById(ticketId);
    };

    // Crear Ticket
    static createTicket(ticketInfo){
        return ticketsDao.createTicket(ticketInfo);
    };
}