import { HeaderContainer } from "./styles";
import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header() {
   return (
      <HeaderContainer>
         <nav>
            <NavLink to="/" title="Timer">
               <Timer size={24} />
            </NavLink>
            <NavLink to="/history" title="history">
               <Scroll size={24} />
            </NavLink>
         </nav>
      </HeaderContainer>
   )
}