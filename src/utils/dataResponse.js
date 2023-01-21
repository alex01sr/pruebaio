import { useDispatch } from "react-redux";
import { setComunidades, setReacciones } from "../../redux/actions";
import socialApp from "../api/socialApp";

export default async function dataResponse(dispatch) {
  try {
    let comunidades = await socialApp.get("/comunidades?populate=imagen");
    let reacciones = await socialApp.get("/reaccion-tipos?populate=*");

    /*    console.log(comunidades.data.data[0].attributes.imagen.data.attributes.url); */
    comunidades = comunidades.data.data?.map((comunidad) => {
      return {
        titulo: comunidad.attributes.titulo,
        id: comunidad.id,
        imagen: comunidad?.attributes?.imagen?.data?.attributes?.url,
      };
    });

    dispatch(setComunidades(comunidades));
    dispatch(setReacciones(reacciones.data.data));
  } catch (error) {
    console.log(error);
  }
}
