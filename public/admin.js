// Your Code Here
async function displayBookName() {
  let response = await fetch("http://localhost:3001/listBooks", {
    method: "GET",
  });
  let books = await response.json();
  console.log(books);
  books.forEach(makeBookList);
}

function makeBookList(book) {
  let rootDiv = document.getElementById("root");
  let li = document.createElement("li");
  li.textContent = book.title;
  rootDiv.append(li);

  let input = document.createElement("input");
  input.type = "number";
  li.append(input);

  let submit = document.createElement("button");
  submit.type = "button";
  submit.value = "Submit";
  li.append(submit);

  submit.addEventListener("click", async function () {
    let clickButton = await fetch("http://localhost:3001/updateBook", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: book.id,
        quantity: input.value,
      }),
    });
    let sort = await clickButton.json();
    console.log(sort);
  });
}

displayBookName();
