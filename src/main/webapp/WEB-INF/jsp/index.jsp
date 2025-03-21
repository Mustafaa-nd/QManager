<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
    <title>QManager</title>
    <style>
        /* Global Styles */
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
        }

        /* Header Styles */
        h1 {
            font-size: 2.5em;
            color: #2c3e50;
            margin-bottom: 20px;
            display: flex;
            text-align: center;
        }

        /* Form Container */
        form {
            margin: 15px 0;
        }

        /* Button Styles */
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
        }

        button:hover {
            background: linear-gradient(90deg, #2c98f0, #4caf50);
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
        }

        /* Spacing between buttons */
        section, form {
            width: 100%;
            max-width: 400px;
            display: flex;
            justify-content: center;
        }

        section p {
            margin: 30px 0;
        }

        /* Responsive Design */
        @media (max-width: 600px) {
            h1 {
                font-size: 2em;
            }

            button {
                width: 100%;
                font-size: 1rem;
                padding: 10px;
            }

            form {
                margin: 10px 0;
            }
        }
    </style>
</head>
<body>
<h1>Bienvenue sur le portail QManager</h1>
<form action="${pageContext.request.contextPath}/selectService" method="get">
    <button type="submit">Choisir un service</button>
</form>
<section>
    <p><br></p>
</section>
<form action="${pageContext.request.contextPath}/agentLogin" method="get">
    <button type="submit">Se connecter en tant qu'agent QM</button>
</form>
<form action="${pageContext.request.contextPath}/adminDashboard" method="get">
    <button type="submit">Se connecter en tant qu'admin QM</button>
</form>
</body>
</html>
