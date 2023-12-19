import { Router } from "express";
import { TicketController } from "../controller/tickets.controller.js";

export const TicketsRouter = Router();


// Obtener Ticket
TicketsRouter.get("/", TicketController.getTickets);

// Crear Ticket
TicketsRouter.post("/",TicketController.createTicket);

// Obtener Ticket por ID
TicketsRouter.get("/:pid", TicketController.getTicketById);
