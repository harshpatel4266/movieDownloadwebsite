
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Cart } from './Home';


export function Project() {
  return (
    <>
    
      <div className="container">
        <div className="row">
          <Cart Title="Jumanji"  Img="../public/Movies/Jumanji.webp"  />
          <Cart Title="Ghost Rider"  Img="../public/Movies/Ghost_Rider.jpg"/>
          <Cart Title="Titanic"  Img="../public/Movies/Titanic.webp" />
          <Cart Title="Game Changer"  Img="public\Movies\Game Changer.jpeg"/>
           <Cart Title="Jurassic World"  Img="public\Movies\Jurassic World.jpg"/>
        </div>

        <br></br>
        <div className="row">
          <Cart Title="Annabelle:Comes Home" Img="public\Movies\Annabelle.webp" />
          <Cart Title="Avatar-The Way Of Water" Img="public\Movies\Avatar-The Way Of Water.jpg"/>
          <Cart Title="Big Game"  Img="public\Movies\Big Game.jpg" />
          <Cart Title="Resident Evil" Img="public\Movies\Resident Evil.jpg" />
          <Cart Title="Vash Level 2" Img="public\Movies\Vash Level2.jpeg" />
        </div>
        <br></br>
        <div className="row">
          <Cart Title="Bloody Daddy" Img="public\Movies\Bloody Daddy.webp" />
          <Cart Title="Pushpa 2:The Rule" Img="public\Movies\Pushpa 2.jpg"/>
          <Cart Title="RRR"  Img="public\Movies\RRR.jpg"/>
          <Cart Title="Animal"  Img="public\Movies\Animal.jpg "/>
          <Cart Title="Coolie"  Img="public\Movies\Coolie.jpg "/>
        </div>
        <br></br>
        <div className="row">
          <Cart Title="Thamma"  Img="public\Movies\Thamma.webp"/>
          <Cart Title="Premalu" Img="public\Movies\Premalu.jpg"/>
          <Cart Title="Hridayam" Img="public\Movies\Hridayam.jpg"/>
          <Cart Title="Phir Hera Pheri" Img="public\Movies\Phir Hera Pheri.jpg"/>
          <Cart Title="Dhol" Img="public\Movies\Dhol.jpg"/>
          
        </div>
        
      </div>

    </>
  );
}