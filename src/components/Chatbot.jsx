import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import OpenAI from "openai";

function Chatbot() {
  const [userInput, setUserInput] = useState("");
  const [botReply, setBotReply] = useState("");
  const [synopsisReply, setSynopsisReply] = useState("");
  const [titleReply, setTitleReply] = useState("");
  const [starsReply, setStarsReply] = useState("");
  const [imageDescriptionReply, setImageDescriptionReply] = useState("");
  const [imageUrlReply, setImageUrlReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMoviePitch, setShowMoviePitch] = useState(false);
  const [showMoviePitchBtn, setShowMoviePitchBtn] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setUserInput("");
    setShow(true);
    setShowMoviePitchBtn(false);
    setBotReply("");
    setSynopsisReply("");
    setTitleReply("");
    setImageDescriptionReply("");
    setStarsReply("");
    setImageUrlReply("");
  };

  const handleShowMoviePitch = () => {
    setShow(false);
    setShowMoviePitch(true);
  };
  const handleCloseMoviePitch = () => setShowMoviePitch(false);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  async function fetchChatbotResponse(userInput) {
    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: `Generate a short message to enthusiastically say an outline sounds interesting and that you need some minutes to think about it.
        ###
        outline: Two dogs fall in love and move to Hawaii to learn to surf.
        message: I'll need to think about that. But your idea is amazing! I love the bit about Hawaii!
        ###
      
        outline: ${userInput}
        message:
        `,
        max_tokens: 60,
      });
      console.log(response.choices[0].text);
      return response.choices[0].text;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async function fetchSynopsis(userInput) {
    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: `Generate an engaging, professional and marketable movie synopsis based on an outline. The synopsis should include actors names in brackets after each character. Choose actors that would be ideal for this role. 
        ###
        outline: A big-headed daredevil fighter pilot goes back to school only to be sent on a deadly mission.
        synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.  
        ###
        outline: ${userInput}
        synopsis:
        `,
        max_tokens: 700,
      });

      console.log(response.choices[0].text);
      return response.choices[0].text;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async function fetchMovieTitle(synopsis) {
    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: `Generate a catchy movie title for this synopsis: ${synopsis}`,
        max_tokens: 25,
        temperature: 0.7,
      });
      setShowMoviePitchBtn(true);
      return response.choices[0].text;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  // async function fetchMovieStars(synopsis) {
  //   try {
  //     const response = await openai.completions.create({
  //       model: "gpt-3.5-turbo-instruct",
  //       prompt: `Extract the names in brackets from the synopsis.
  //       ###
  //       synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.
  //       names: Tom Cruise, Val Kilmer, Kelly McGillis
  //       ###
  //       synopsis: ${synopsis}
  //       names:
  //       `,
  //       max_tokens: 30,
  //       temperature: 0.7,
  //     });
  //     return response.choices[0].text;
  //   } catch (error) {
  //     console.error("Error:", error);
  //     throw error;
  //   }
  // }

  // async function fetchImageDescription(title, synopsis) {
  //   try {
  //     const response = await openai.completions.create({
  //       model: "gpt-3.5-turbo-instruct",
  //       prompt: `Give a short description of an image which could be used to advertise a movie based on a title and synopsis. The description should be rich in visual detail but contain no names.
  //       ###
  //       title: ${title}
  //       synopsis: ${synopsis}
  //       image description:
  //       `,
  //       temperature: 0.8,
  //       max_tokens: 100,
  //     });
  //     return response.choices[0].text;
  //   } catch (error) {
  //     console.error("Error:", error);
  //     throw error;
  //   }
  // }

  // async function fetchImageURL(imageDescription) {
  //   try {
  //     const response = await openai.images.generate({
  //       prompt: `${imageDescription}. There should be no text in this image.`,
  //       n: 1,
  //       size: "256x256",
  //       response_format: "url",
  //     });

  //     return response.data[0].url;
  //   } catch (error) {
  //     console.error("Error:", error);
  //     throw error;
  //   }
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const botResponse = await fetchChatbotResponse(userInput);
      setBotReply(botResponse);
      const synopsisResponse = await fetchSynopsis(userInput);
      const titleResponse = await fetchMovieTitle(synopsisResponse);
      // const starsResponse = await fetchMovieStars(synopsisResponse);
      // const imageDescriptionResponse = await fetchImageDescription(
      //   titleResponse,
      //   synopsisResponse
      // );
      // const imageUrlResponse = await fetchImageURL(imageDescriptionResponse);

      setSynopsisReply(synopsisResponse);
      setTitleReply(titleResponse);
      // setStarsReply(starsResponse);
      // setImageDescriptionReply(imageDescriptionResponse);
      // setImageUrlReply(imageUrlResponse);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {show === false ? (
        <Button
          id="avatar-chatbot-btn"
          onClick={handleShow}
          className="bg-transparent border border-0"
        >
          <img src="./img/perfil.png" id="avatar-chatbot" />
        </Button>
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className="bg-secondary">
            <div className="d-flex justify-content-center align-items-center w-100">
              <img
                src="./img/logo-movie.png"
                alt="MoviePitch"
                className="me-3"
                style={{ height: "3rem" }}
              />
              <Link
                to="/"
                style={{ fontSize: "1.5rem" }}
                className="text-light"
              >
                <span className="fw-bolder">Movie</span>
                Pitch!
              </Link>
            </div>
          </Modal.Header>
          <Modal.Body className="m-0 p-0">
            <Form onSubmit={handleSubmit} className="p-0">
              <section className="m-2">
                <div className="setup-inner">
                  <img src="./img/movieboss.png" />
                  {!botReply ? (
                    <div className="speech-bubble-ai" id="speech-bubble-ai">
                      <p>
                        Give me a one-sentence concept and I'll give you an
                        eye-catching title AND a synopsis the studios will love!
                      </p>
                    </div>
                  ) : (
                    <div className="speech-bubble-ai" id="speech-bubble-ai">
                      <p>{botReply}</p>
                    </div>
                  )}
                </div>
                {isLoading === true ? (
                  <div
                    className="loading d-flex justify-content-center align-items-center m-4"
                    id="loading"
                  >
                    <img
                      src="./img/loading.svg"
                      className="loading"
                      id="loading"
                    />
                  </div>
                ) : !showMoviePitchBtn ? (
                  <div
                    className="setup-inner setup-input-container"
                    id="setup-input-container"
                  >
                    <input
                      className="w-100 rounded-start border border-secondary border-end-0 "
                      id="setup-textarea"
                      placeholder="Go on and type an intriguing plot!..."
                      as="textarea"
                      rows={2}
                      value={userInput}
                      onChange={(event) => setUserInput(event.target.value)}
                    />
                    <button
                      className="send-btn "
                      id="send-btn"
                      aria-label="send"
                      type="submit"
                    >
                      <img src="./img/send-btn-icon.png" alt="send" />
                    </button>
                  </div>
                ) : (
                  ""
                )}
                {showMoviePitchBtn ? (
                  <div className="d-flex justify-content-center align-items-center mb-4">
                    <button
                      className="rounded text-light p-2 fs-3"
                      id=""
                      aria-label="send"
                      type="button"
                      onClick={handleShowMoviePitch}
                    >
                      Movie Pitch
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </section>
            </Form>
          </Modal.Body>
        </Modal>
      )}

      <Modal show={showMoviePitch} onHide={handleCloseMoviePitch}>
        <Modal.Header closeButton className="bg-secondary">
          <div className="d-flex justify-content-center align-items-center w-100">
            <img
              src="./img/logo-movie.png"
              alt="MoviePitch"
              className="me-3"
              style={{ height: "3rem" }}
            />
            <Link to="/" style={{ fontSize: "1.5rem" }} className="text-light">
              <span className="fs-4">You'll love it!😊</span>
            </Link>
          </div>
        </Modal.Header>
        <Modal.Body>
          <section className="output-container" id="output-container">
            {/* <div
              id="output-img-container"
              className="output-img-container d-flex justify-content-center align-items-center m-2"
            >
              <img
                src={`${imageUrlReply}`}
                alt="movie-img"
                style={{ width: "100%" }}
              />
            </div> */}
            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
              <h1 id="output-title">{titleReply}</h1>
              {/* <h2 id="output-stars">{starsReply}</h2> */}
            </div>

            <p id="output-text" className="m-2">
              {synopsisReply}
            </p>
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Chatbot;

//A madman develops a machine to control all humans and only intelligent animals can save the human race
//a traveller goes back to the 1980s to prevent a catastrophic event, but falls in love with somenone from the past and choose between saving the world or staying with them
//Un jugador de futbol, el mejor del mundo gana un campeonato que lo lleva a la fama y a las grandes ligas
//La hormiga Potita y el Sapo Pepe son grandes amigos y se enfrentarán a una aventura que cambiará sus vidas. En una isla con un volcán enfrentarán las más peligrosas pruebas hasta alcanzar el tesoro perdido, la piedra preciosa.
//Griselda, se está a punto de embarcar en una gran aventura misteriosa. Ha descubierto un tunel escodido que la llevará directo al mundo de Griselda. Un mundo imaginario de su interior donde encontrará secretos y  tribulaciones, conflictos que la llevarán a la búsqueda de un ser superior. En el día de su cumpleños la verdad será revelada.

//Griselda, se está a punto de embarcar en una gran aventura misteriosa. Ha descubierto un tunel escodido que la llevará directo al mundo de Griselda. Un mundo imaginario de su interior donde encontrará secretos y  tribulaciones, conflictos que la llevarán a la búsqueda de un ser superior. En el día de su cumpleños la verdad será revelada.
