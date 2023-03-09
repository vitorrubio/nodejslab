            function pegaDados()
            {
                fetch('http://127.0.0.1:8090/user')
                    .then((response) => response.json())
                    .then((data) => 
                    {
                        document.getElementById("resultado").value = data;
                        console.log(data);
                        var table = document.getElementById("tabela");
                        for(let i = 0; i< data.length; i++)
                        {
                            

                            // Create an empty <tr> element and add it to the 1st position of the table:
                            var row = table.insertRow(-1);

                            // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);

                            // Add some text to the new cells:
                            cell1.innerHTML = data[i].username;
                            cell2.innerHTML = data[i].id;
                        }
                    });
            }



            function cadastrar()
            {
                let nome = document.getElementById("txtUser").value;
                let nascimento = document.getElementById("txtNascimento").value;

                    fetch('http://127.0.0.1:8090/user', {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },    
                        body: JSON.stringify(
                            {
                                "username":nome,
                                "birthday":nascimento
                            }
                        ),                    
                    })
                    .then((response) => response.json())
                    .then((data) => 
                    {
                        document.getElementById("resultado").value = data;
                        console.log(data);
                        alert(`usuário {data.username} cirado com sucesso`);
                    })
                        if x is null
            }