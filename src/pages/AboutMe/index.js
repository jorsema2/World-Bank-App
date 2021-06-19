import React, { useState } from "react";
import {
  MainContent,
  ContentLeftContainer,
  Header,
  MyName,
  StyledButton,
  ContentRightContainer,
  LeftContainerSection,
  TopicSection,
  TopicSectionTitle,
  TopicSectionItem,
  SectionFragmentTitle,
  RightContainerSection,
  RightSectionList,
  ExternalLink,
} from "./style";

const AboutMe = () => {
  const [isEnglish, setIsEnglish] = useState(true);

  return (
    <div>
      {isEnglish && (
        <MainContent>
          <ContentLeftContainer>
            <Header>
              <div>
                <MyName>Jorge Segura Martínez</MyName>
                <h2>Front-end Developer specialized in React</h2>
              </div>
              <StyledButton onClick={() => setIsEnglish(!isEnglish)}>
                Spanish
              </StyledButton>
            </Header>
            <LeftContainerSection>
              <TopicSection>
                <TopicSectionTitle>ABOUT ME</TopicSectionTitle>
                <p>
                  I am a Front-end developer with experience in JavaScript,
                  React, and other Front-end technologies. I also have
                  experience working with Git. Previously, I graduated in
                  Economics. This experience has given me a background to
                  understand the business world, and also the economy in
                  general.
                </p>
              </TopicSection>
              <TopicSection>
                <TopicSectionTitle>PROJECTS</TopicSectionTitle>
                <TopicSectionItem>
                  <SectionFragmentTitle>World Bank App</SectionFragmentTitle>
                  <p>
                    Source code:{" "}
                    <a
                      href="https://github.com/jorsema2/World-Bank-App"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://github.com/jorsema2/World-Bank-App
                    </a>
                  </p>
                  <p>
                    Live demo:{" "}
                    <a
                      href="https://world-charts.herokuapp.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://world-charts.herokuapp.com/
                    </a>
                  </p>
                  <p>
                    An application created with React that allows users to
                    create interactive charts of time series. It uses the World
                    Bank's Indicators API to collect data from 200 countries and
                    more than 15,000 indicators, allowing the generation of
                    millions of possible charts. The application gives the
                    possibility of comparing data from up to 4 countries
                    simultaneously. Provides a list of all API indicators and a
                    section of recommended indicators. Also, the UI is available
                    in both dark and light mode.
                  </p>
                  <p>Features: </p>
                  <ul>
                    <li>Use of React Hooks to manage states and effects.</li>
                    <li>Use of Context API to simplify state management.</li>
                    <li>
                      Interactive chart implemented using the Chart.js library.
                    </li>
                    <li>Infinite dropdown showing API indicators.</li>
                    <li>
                      Multi-select dropdown to choose up to 3 additional
                      countries.
                    </li>
                    <li>List of recommended indicators.</li>
                    <li>
                      Use of Styled-Components to implement the design and the
                      two themes (dark and light).
                    </li>
                    <li>Dynamic routing using React-Router.</li>
                  </ul>
                  <p>
                    Libraries: React 16, React-Router, Chart.js, React-Select,
                    React-bottom-scroll-listener, Styled-Components, and Ant
                    Design.
                  </p>
                  <p>APIs: World Bank Indicators API, and REST countries.</p>
                </TopicSectionItem>
              </TopicSection>
              <TopicSection>
                <TopicSectionTitle>EDUCATION</TopicSectionTitle>
                <TopicSectionItem>
                  <SectionFragmentTitle>
                    Cristian Florea - ongoing mentorship
                  </SectionFragmentTitle>
                  <h5>May 2020 - present</h5>
                  <p>
                    Cristian Florea is a senior Front-end developer currently
                    working at Novartis. In addition, he acts as a mentor for
                    those, like me, who want to get their first job as a
                    front-end developer. Since I met him, Cristian has guided me
                    day by day to help me get the skills that companies look for
                    in a Front-end developer by, for example, reviewing my code
                    every week, insisting that it be a clean and intelligible
                    code. Under his supervision, I improved my CSS skills,
                    delved into JavaScript, and built a web application with
                    React (World Bank App).
                  </p>
                  <a
                    href="https://www.linkedin.com/in/cristian-florea-396046123/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.linkedin.com/in/cristian-florea-396046123/
                  </a>
                </TopicSectionItem>
                <TopicSectionItem>
                  <SectionFragmentTitle>
                    CodeCademy - online courses
                  </SectionFragmentTitle>
                  <h5>October 2019 - April 2020</h5>
                  <p>
                    Thanks to the resources of this e-learning platform, I began
                    to learn HTML, CSS and the fundamentals of JavaScript. In
                    addition, I collaborated with their Community Team to
                    encourage the platform's new web development students to
                    participate in the community, for example, by organizing a
                    web development contest using HTML and CSS.
                  </p>
                  <a
                    href="https://www.codecademy.com/profiles/Jorge-Segura"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.codecademy.com/profiles/Jorge-Segura
                  </a>
                </TopicSectionItem>
                <TopicSectionItem>
                  <SectionFragmentTitle>
                    Katholieke Universiteit Leuven (Belgium),{" "}
                    <span>Erasmus program</span>
                  </SectionFragmentTitle>
                  <h5>September 2017 - June 2018</h5>
                  <p>
                    Erasmus experience at a prestigious European university that
                    allowed me to deepen my knowledge of business economics,
                    improve my English and meet people from other cultures.
                  </p>
                </TopicSectionItem>
                <TopicSectionItem>
                  <SectionFragmentTitle>
                    Universidad de Valencia (Spain),{" "}
                    <span>Bachelor’s degree in Economics</span>
                  </SectionFragmentTitle>
                  <h5>September 2014 - January 2019</h5>
                  <p>
                    Degree in which I acquired knowledge about various areas of
                    economics, such as macroeconomics, microeconomics, business
                    economics, international, public regulation, etc.
                  </p>
                </TopicSectionItem>
              </TopicSection>
            </LeftContainerSection>
          </ContentLeftContainer>
          <ContentRightContainer>
            <RightContainerSection>
              <TopicSectionTitle>CONTACT</TopicSectionTitle>
              <RightSectionList>
                <li>
                  <ExternalLink href="mailto: jorsema2@gmail.com">
                    jorsema2@gmail.com
                  </ExternalLink>
                </li>
                <li>
                  <a
                    href="https://github.com/jorsema2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/
            jorge-segura-mart%C3%ADn
            ez-6b53851b3/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              </RightSectionList>
            </RightContainerSection>
            <RightContainerSection>
              <TopicSectionTitle>SKILLS</TopicSectionTitle>
              <RightSectionList>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>ES6</li>
                <li>ES7</li>
                <li>React</li>
                <li>Styled-Components</li>
                <li>React-Router</li>
                <li>Chart.js</li>
                <li>Git</li>
              </RightSectionList>
            </RightContainerSection>
            <RightContainerSection>
              <TopicSectionTitle>LANGUAGES</TopicSectionTitle>
              <RightSectionList>
                <li>Spanish (native)</li>
                <li>Catalan (native)</li>
                <li>English (C1)</li>
                <li>Portuguese (C1)</li>
              </RightSectionList>
            </RightContainerSection>
          </ContentRightContainer>
        </MainContent>
      )}
      {!isEnglish && (
        <MainContent>
          <ContentLeftContainer>
            <Header>
              <div>
                <MyName>Jorge Segura Martínez</MyName>
                <h2>Desarrollador Front-end especializado en React</h2>
              </div>
              <StyledButton onClick={() => setIsEnglish(!isEnglish)}>
                Inglés
              </StyledButton>
            </Header>
            <LeftContainerSection>
              <TopicSection>
                <TopicSectionTitle>ACERCA DE MÍ</TopicSectionTitle>
                <p>
                  Soy un desarrollador Front-end con experiencia en JavaScript,
                  React, y otras tecnologías Front-end. También tengo
                  experiencia trabajando con Git. Anteriormente, me gradué en
                  Economía. Esta experiencia me ha aportado bagaje para entender
                  el mundo de la empresa, y también la economía en general.
                </p>
              </TopicSection>
              <TopicSection>
                <TopicSectionTitle>PROYECTOS</TopicSectionTitle>
                <TopicSectionItem>
                  <SectionFragmentTitle>World Bank App</SectionFragmentTitle>
                  <p>
                    Código fuente:{" "}
                    <a
                      href="https://github.com/jorsema2/World-Bank-App"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://github.com/jorsema2/World-Bank-App
                    </a>
                  </p>
                  <p>
                    Live demo:{" "}
                    <a
                      href="https://world-charts.herokuapp.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://world-charts.herokuapp.com/
                    </a>
                  </p>
                  <p>
                    Una aplicación creada con React que permite crear gráficos
                    interactivos de series temporales. Utiliza Indicators API
                    del Banco Mundial para recabar datos de 200 países y de más
                    de 15000 indicadores, permitiendo la generación de millones
                    de gráficos posibles. La aplicación da la posibilidad de
                    comparar datos de hasta 4 países de forma simultánea. Ofrece
                    una lista con todos los indicadores de la API y una sección
                    de indicadores recomendados. Además, la UI está disponible
                    en modo oscuro y en modo claro.
                  </p>
                  <p>Características: </p>
                  <ul>
                    <li>
                      Uso de React Hooks para el manejo de estados y de efectos.
                    </li>
                    <li>
                      Uso de Context API para simplificar el manejo de estados.
                    </li>
                    <li>
                      Gráfico interactivo implementado mediante la biblioteca
                      Chart.js.
                    </li>
                    <li>
                      Dropdown infinito que muestra indicadores de la API.
                    </li>
                    <li>
                      Multi-select dropdown para escoger hasta 3 países
                      adicionales.
                    </li>
                    <li>Listado de indicadores recomendados.</li>
                    <li>
                      Uso de Styled-Components para implementar el diseño y los
                      dos temas (oscuro y claro).
                    </li>
                    <li>Routing dinámico utilizando React-Router.</li>
                  </ul>
                  <p>
                    Bibliotecas: React 16, React-Router, Chart.js, React-Select,
                    React-bottom-scroll-listener, Styled-Components, y Ant
                    Design.
                  </p>
                  <p>APIs: World Bank Indicators API, y REST countries.</p>
                </TopicSectionItem>
              </TopicSection>
              <TopicSection>
                <TopicSectionTitle>FORMACIÓN</TopicSectionTitle>
                <TopicSectionItem>
                  <SectionFragmentTitle>
                    Cristian Florea - mentoría en curso
                  </SectionFragmentTitle>
                  <h5>Mayo de 2020 - presente</h5>
                  <p>
                    Cristian Florea es un desarrollador Front-end senior que
                    actualmente trabaja en Novartis. Además, ejerce como mentor
                    para quienes, como yo, quieren conseguir su primer trabajo
                    como desarrollador Front-end. Desde que le conocí, Cristian
                    me ha guiado día a día para que yo consiguiera las
                    habilidades que las empresas buscan en un Front-end
                    developer, por ejemplo, revisando mi código cada semana,
                    incidiendo en que fuera un código limpio e inteligible. Bajo
                    su supervisión, mejoré mis conocimientos de CSS, profundicé
                    en JavaScript y construí una aplicación web con React (World
                    Bank App).
                  </p>
                  <a
                    href="https://www.linkedin.com/in/cristian-florea-396046123/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.linkedin.com/in/cristian-florea-396046123/
                  </a>
                </TopicSectionItem>
                <TopicSectionItem>
                  <SectionFragmentTitle>
                    CodeCademy - cursos online
                  </SectionFragmentTitle>
                  <h5>Octubre de 2019 - Abril de 2020</h5>
                  <p>
                    Gracias a los recursos de esta plataforma de e-learning,
                    comencé a aprender HTML, CSS y los fundamentos de
                    JavaScript. Además, colaboré con su Community Team para
                    animar a los nuevos estudiantes de desarrollo web de la
                    plataforma a participar en la comunidad, por ejemplo,
                    organizando un concurso de desarrollo web usando HTML y CSS.
                  </p>
                  <a
                    href="https://www.codecademy.com/profiles/Jorge-Segura"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.codecademy.com/profiles/Jorge-Segura
                  </a>
                </TopicSectionItem>
                <TopicSectionItem>
                  <SectionFragmentTitle>
                    Katholieke Universiteit Leuven (Bélgica),{" "}
                    <span>Programa Erasmus</span>
                  </SectionFragmentTitle>
                  <h5>Septiembre de 2017 - Junio de 2018</h5>
                  <p>
                    Experiencia Erasmus en una prestigiosa universidad europea
                    que me permitió profundizar mis conocimientos sobre economía
                    de la empresa, mejorar mi inglés y conocer personas de otras
                    culturas.
                  </p>
                </TopicSectionItem>
                <TopicSectionItem>
                  <SectionFragmentTitle>
                    Universidad de Valencia (España),{" "}
                    <span>Grado en Economía</span>
                  </SectionFragmentTitle>
                  <h5>Septiembre de 2014 - Enero de 2019</h5>
                  <p>
                    Grado en el que adquirí conocimientos sobre diversas áreas
                    de la ciencia económica, tales como la macroeconomía, la
                    microeconomía, la economía de la empresa, la teoría del
                    comercio, la regulación pública, etc.
                  </p>
                </TopicSectionItem>
              </TopicSection>
            </LeftContainerSection>
          </ContentLeftContainer>
          <ContentRightContainer>
            <RightContainerSection>
              <TopicSectionTitle>CONTACTO</TopicSectionTitle>
              <RightSectionList>
                <ExternalLink href="mailto: jorsema2@gmail.com">
                  jorsema2@gmail.com
                </ExternalLink>
                <li>
                  GitHub:
                  <br></br>
                  <a
                    href="https://github.com/jorsema2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/jorsema2
                  </a>
                </li>
                <li>
                  LinkedIn:
                  <br></br>
                  <a
                    href="https://www.linkedin.com/in/
            jorge-segura-mart%C3%ADn
            ez-6b53851b3/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.linkedin.com/in/ jorge-segura-mart%C3%ADn
                    ez-6b53851b3/
                  </a>
                </li>
              </RightSectionList>
            </RightContainerSection>
            <RightContainerSection>
              <TopicSectionTitle>COMPETENCIAS</TopicSectionTitle>
              <RightSectionList>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>ES6</li>
                <li>ES7</li>
                <li>React</li>
                <li>Styled-Components</li>
                <li>React-Router</li>
                <li>Chart.js</li>
                <li>Git</li>
              </RightSectionList>
            </RightContainerSection>
            <RightContainerSection>
              <TopicSectionTitle>IDIOMAS</TopicSectionTitle>
              <RightSectionList>
                <li>Español (nativo)</li>
                <li>Catalán (nativo)</li>
                <li>Inglés (C1)</li>
                <li>Portugués (C1)</li>
              </RightSectionList>
            </RightContainerSection>
          </ContentRightContainer>
        </MainContent>
      )}
    </div>
  );
};

export default AboutMe;
