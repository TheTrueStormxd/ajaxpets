/**
 * A webpage for fetching cute pet photos.
 * Photos will be populated on the page after the user
 * selects their desired pet type.
 */
"use strict";
(function() {

  window.addEventListener("load", init);
    
    
    
  /**
   * TODO: What do we need to initialize?
   */
  function init() {
    const pet_options = document.querySelectorAll("input[name = animal]"); // tra ve 1 array
    pet_options.forEach(pet_option=>{
      pet_option.addEventListener("change",(e)=>{ // e = event object thuoc ve pet_option
        makeRequest(e.target.value)  // value la lay cua object pet_option => value = kitty?puppy
      });
    })
      
  }

  /**
   * TODO: Fetch data from the ajax pets API!
   */
  function makeRequest(value) {
      const URL = `https://hanustartup.org/wpr/api/pets/index.php?animal=${value}`; //request String su dung chuoi noi suy dau cosole csgo
      fetch (URL) 
          .then(statusCheck)
          .then(res=> res.text())
          .then(data => {
            const imageLinks = data.split('\n')
            RenderImg (imageLinks)

          })
      
    


  }
    function RenderImg(imageLinks) {
      const picture = document.querySelector("#pictures")
      picture.innerHTML = ''
      imageLinks.forEach(imageLink=>{
        picture.innerHTML +=  `
            <img src=${imageLink} alt="animal">   
        `
      })
    }

  /**
   * TODO: Implement any other functions you need
   */

  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();
