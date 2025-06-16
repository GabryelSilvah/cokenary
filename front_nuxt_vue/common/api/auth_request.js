export { autenticar_user };

const URL_BASE_API = "http://localhost:8081/auth";

/*
*Não altere, adicione ou retire nada da estrutura, 
*código ou quaisquer outra coisa desse arquivo sem permissão
*/

//Autenticar
async function autenticar_user(corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/cadastrar",
    {
      method: "POST",
      headers: { "Content-Type": "appliuserion/json" },
      body: JSON.stringify(corpo_request)
    });

  return responseAPI;
}