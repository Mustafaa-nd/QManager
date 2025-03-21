<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>QM Agent - Tableau de Bord</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #444;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            text-align: center;
        }

        h1 {
            font-size: 2.5em;
            color: #2c3e50;
            margin-bottom: 20px;
        }

        .info-container {
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 20px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
            margin-bottom: 20px;
        }

        .info-container p {
            font-size: 1.2rem;
            line-height: 1.6;
            margin: 10px 0;
            color: #555;
        }

        .info-container span {
            font-weight: bold;
            color: #2c3e50;
        }

        .button-container {
            display: flex;
            justify-content: center;
            gap: 20px;
        }

        button {
            background: linear-gradient(90deg, #4caf50, #2c98f0);
            color: white;
            border: none;
            padding: 12px 20px;
            font-size: 1rem;
            font-weight: 500;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            width: 45%;
        }

        button:hover {
            background: linear-gradient(90deg, #2c98f0, #4caf50);
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 600px) {
            h1 {
                font-size: 2em;
            }
            .info-container {
                padding: 15px;
            }
            button {
                width: 100%;
            }
        }
    </style>
</head>
<body>
<h1>Tableau de Bord - Agent</h1>
<h2>Service : <span>${service}</span></h2>
<h2>Localisation : <span>${location}</span></h2>
<h3>Connecté en tant que : <span>${username}</span></h3>

<div class="info-container">
    <p>Numéro en cours de traitement : <span>${currentTicket.ticketNumber}</span></p>
    <p>Clients restants dans la file : <span>${remaining}</span></p>
</div>

<div class="button-container">
    <form action="${pageContext.request.contextPath}/next" method="post">
        <input type="hidden" name="service" value="${service}">
        <input type="hidden" name="location" value="${location}">
        <button type="submit">Passer au suivant</button>
    </form>

    <form action="${pageContext.request.contextPath}/previous" method="post">
        <input type="hidden" name="service" value="${service}">
        <input type="hidden" name="location" value="${location}">
        <button type="submit">Revenir au précédent</button>
    </form>
</div>
</body>
</html>
