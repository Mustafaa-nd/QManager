<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
    <title>Choix de la localisation</title>
    <style>
        /* Global Styles */
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }

        /* Header Styles */
        h1 {
            font-size: 2em;
            color: #2c3e50;
            margin-bottom: 20px;
        }

        /* Form Styles */
        form {
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 20px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1rem;
            margin-bottom: 20px;
            background-color: #f9f9f9;
            appearance: none;
        }

        select:focus {
            border-color: #3498db;
            outline: none;
            box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
        }

        input[type="hidden"] {
            display: none;
        }

        /* Button Styles */
        button {
            background: linear-gradient(90deg, #27ae60, #2980b9);
            color: white;
            border: none;
            padding: 12px 20px;
            font-size: 1rem;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            width: 100%;
            transition: all 0.3s ease;
        }

        button:hover {
            background: linear-gradient(90deg, #2980b9, #27ae60);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }

        /* Responsive Design */
        @media (max-width: 600px) {
            h1 {
                font-size: 1.8em;
            }

            form {
                padding: 15px;
            }

            button {
                font-size: 1rem;
                padding: 10px;
            }
        }
    </style>
</head>
<body>
<h1>Choisissez une localisation pour ${service}</h1>
<form action="${pageContext.request.contextPath}/generateTicket" method="post">
    <input type="hidden" name="service" value="${service}">
    <select name="location">
        <c:forEach items="${locations}" var="location">
            <option value="${location}">${location}</option>
        </c:forEach>
    </select>
    <button type="submit">Generer un ticket</button>
</form>
</body>
</html>
