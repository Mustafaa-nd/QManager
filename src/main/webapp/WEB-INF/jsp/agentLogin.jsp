<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
    <title>Connexion Agent - QManager</title>
    <style>
        /* Styles Globaux */
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

        /* Formulaire */
        .login-form {
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 30px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        label {
            font-size: 1.1rem;
            color: #555;
            margin-top: 10px;
            display: block;
            text-align: left;
        }

        select, input {
            width: 100%;
            padding: 10px;
            font-size: 1rem;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-top: 5px;
            margin-bottom: 15px;
            box-sizing: border-box;
        }

        /* Boutons */
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
            width: 100%;
        }

        button:hover {
            background: linear-gradient(90deg, #2c98f0, #4caf50);
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
        }
    </style>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const serviceSelect = document.getElementById("service");
            const locationSelect = document.getElementById("location");

            serviceSelect.addEventListener("change", function () {
                locationSelect.innerHTML = '<option value="">Sélectionner une localisation</option>';

                const selectedService = serviceSelect.value;
                const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];

                if (selectedOption.dataset.locations) {
                    const locations = selectedOption.dataset.locations.split(",");
                    locations.forEach(function (loc) {
                        const option = document.createElement("option");
                        option.value = loc.trim();
                        option.textContent = loc.trim();
                        locationSelect.appendChild(option);
                    });
                }
            });
        });
    </script>
</head>
<body>
<h1>Connexion Agent - QManager</h1>
<div class="login-form">
    <h2>Se connecter</h2>
    <form action="${pageContext.request.contextPath}/agentDashboard" method="post">
        <label for="service">Service</label>
        <select id="service" name="service" required>
            <option value="">Sélectionner un service</option>
            <c:forEach var="service" items="${services}">
                <option value="${service.name}" data-locations="<c:forEach var='loc' items='${service.locations}' varStatus='loop'>${loc}<c:if test='${!loop.last}'>,</c:if></c:forEach>">
                        ${service.name}
                </option>
            </c:forEach>
        </select>

        <label for="location">Localisation</label>
        <select id="location" name="location" required>
            <option value="">Sélectionner une localisation</option>
        </select>

        <label for="username">Nom d'utilisateur</label>
        <input type="text" id="username" name="username" required placeholder="Entrez votre nom d'utilisateur">

        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" required placeholder="Entrez votre mot de passe">

        <button type="submit">Se connecter</button>
    </form>
</div>
</body>
</html>
