<!DOCTYPE html>
<html>
<head>
    <title>QM Admin - Tableau de Bord</title>
    <style>
        /* Global Styles */
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f7f9;
            color: #333;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            min-height: 100vh;
            padding: 20px;
        }

        /* Header Styles */
        h1 {
            font-size: 2.5em;
            color: #2c3e50;
            margin-bottom: 10px;
        }

        h2 {
            font-size: 2em;
            color: #2c3e50;
            margin-bottom: 15px;
        }

        p {
            font-size: 1.2rem;
            margin: 5px 0;
            color: #555;
        }

        p span {
            font-weight: bold;
            color: #2c3e50;
        }

        /* Table Styles */
        table {
            width: 100%;
            max-width: 800px;
            border-collapse: collapse;
            margin: 20px 0;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        table th, table td {
            text-align: left;
            padding: 12px 15px;
            border: 1px solid #ddd;
            font-size: 1rem;
        }

        table th {
            background-color: #3498db;
            color: #ffffff;
            font-weight: bold;
            text-transform: uppercase;
        }

        table tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        table tr:hover {
            background-color: #f1f1f1;
        }

        /* Responsive Styles */
        @media (max-width: 600px) {
            table, table th, table td {
                font-size: 0.9rem;
            }

            h1 {
                font-size: 2em;
            }

            h2 {
                font-size: 1.5em;
            }

            p {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
<h1>Administrateur QM</h1>
<p>Service : <span>${service}</span></p>
<p>Localisation : <span>${location}</span></p>

<h2>Historique des actions</h2>
<table>
    <thead>
    <tr>
        <th>Action</th>
        <th>Numero de Ticket</th>
        <th>Date/Heure</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach items="${actions}" var="action">
        <tr>
            <td>${action.type}</td>
            <td>${action.ticketNumber}</td>
            <td>${action.timestamp}</td>
        </tr>
    </c:forEach>
    </tbody>
</table>
</body>
</html>
