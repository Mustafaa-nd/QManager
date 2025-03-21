<!DOCTYPE html>
<html>
<head>
    <title>Generation du Ticket</title>
    <style>
        /* Global Styles */
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f9fc;
            color: #333;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }

        /* Header Styles */
        h1 {
            font-size: 2.5em;
            color: #2c3e50;
            margin-bottom: 20px;
            text-align: center;
        }

        /* Ticket Styles */
        .ticket-container {
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 20px;
            width: 100%;
            max-width: 500px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .ticket-container p {
            font-size: 1.1rem;
            line-height: 1.6;
            margin: 10px 0;
            color: #555;
        }

        .ticket-container p span {
            font-weight: bold;
            color: #2c3e50;
        }

        /* Highlighted Info */
        .highlight {
            font-size: 1.2rem;
            color: #27ae60;
            font-weight: bold;
        }

        /* Footer Styles */
        footer {
            margin-top: 20px;
            font-size: 0.9rem;
            color: #888;
            text-align: center;
        }

        @media (max-width: 600px) {
            h1 {
                font-size: 2em;
            }

            .ticket-container {
                padding: 15px;
            }

            .ticket-container p {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
<h1>Votre Ticket</h1>
<div class="ticket-container">
    <p>Service : <span>${ticket.service}</span></p>
    <p>Localisation : <span>${ticket.location}</span></p>
    <p>Numero de Ticket : <span class="highlight">${ticket.ticketNumber}</span></p>
    <p>Votre position dans la file : <span>${position}</span></p>
    <p>Nombre de personnes devant vous : <span>${peopleAhead}</span></p>
    <p>Numero en cours de traitement : <span>${currentTicket.ticketNumber}</span></p>
</div>
<footer>
    Merci d'avoir utilise le service ${ticket.service} QM. <br>Bonne attente !
</footer>
</body>
</html>
