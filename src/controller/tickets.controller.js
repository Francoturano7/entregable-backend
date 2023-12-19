import { TicketsService } from "../service/tickets.service.js";

export class TicketController{
    // Obtener Tickets
    static getTickets = async (req, res) => {
        const result = await TicketsService.getTickets();
        res.json({message: "Lista de Tickets", data: result});
    };

    // Obtener Tickets por ID
    static getTicketById = async(req,res)=>{
        try {
            const ticketId = parseInt(req.params.pid);
            const ticket = await TicketsService.getTicketById(ticketId);
            res.json({message:"endpoint para obtener un ticket por ID", data: ticket});
        } catch (error) {
            res.json({status:"error",message:error.message});
        }
    };

    // Crear Ticket
    static createTicket = async (req, res)=>{
        try {
            const ticketInfo = req.body;
            const result = await TicketsService.createTicket(ticketInfo);
            res.json({status:"success", result});
        } catch (error) {
            res.json({status:"error", message:error.message});
        };
    };
};