import { SEPTACalculationOutput, SEPTACalculationSelect } from "../../components"
import Logo from "../../assets/images/SEPTA-logo.png"

import * as S from "./SEPTACalculatorWidgetContainer.styled"

export const SEPTACalculatorWidgetContainer = () => {
    return (
        <S.SEPTACalculatorWidgetContainer>
            <header>  
                <img src={Logo} alt="" />
                <h1>Regional Rail Fares</h1> 
            </header>

            <main>
                <SEPTACalculationSelect label="Where are you going" options={[]} />
            </main>

            <SEPTACalculationOutput />
        </S.SEPTACalculatorWidgetContainer>
    )
}