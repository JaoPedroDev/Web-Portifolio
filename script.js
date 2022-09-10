const age_element = document.getElementsByClassName("age");

// Calcula a idade dinamicamente
function calcAge(birth_day, birth_month, birth_year) {
    let today = new Date();
    let current_day = +today.getDate();
    let current_month = +today.getMonth() + 1;
    let current_year = +today.getFullYear();

    let age = current_year - birth_year

    if (current_month < birth_month) {
        age--;
    } else if (current_month == birth_month && current_day < birth_day) {
        age--;
    }

    return age;
}

// Div que contém os posts
const posts_element = document.getElementById("posts");

function renderPost(title, title_link, image, image_alt, paragraph, id) {
    // Div que contém o conteúdo de um post
    let post_div = document.createElement("div");
    post_div.setAttribute("id", id);
    post_div.setAttribute("class", "project_div");

    // Titulo h3
    let post_title = document.createElement("h3");
    post_title.innerText = title;

    // Link relacionado ao post
    let post_link = document.createElement("a");
    post_link.setAttribute("href", title_link);
    post_link.setAttribute("target", "_blank");

    // Coloca o h3 dentro do link
    post_link.appendChild(post_title);

    // Imagem criada somente se seu caminho for diferente de ""
    let post_image;
    if (image !== "") {
        post_image = document.createElement("img");
        post_image.setAttribute("src", image);
        post_image.setAttribute("alt", image_alt);
        post_image.setAttribute("class", "project_image");
    }

    // Paragrafo do post
    let post_paragraph = document.createElement("p");
    post_paragraph.innerHTML = paragraph;
    post_paragraph.setAttribute("class", "project_paragraph");

    // Coloca o conteúdo dentro da div do post
    post_div.appendChild(post_link);
    if (image !== "") { post_div.appendChild(post_image) } // Imagem adicionada somente se seu caminho for diferente de ""
    post_div.appendChild(post_paragraph);

    // Coloca o post pronto dentro da div que contém todos os posts
    posts_element.appendChild(post_div);
}

window.addEventListener("load", () => {
    let age = calcAge(23, 9, 2000);

    // Loop HTMLCollection
    for (let i = 0; i < age_element.length; i++) {
        age_element[i].innerText = age;
    }

    // Renderiza todos os posts de acordo com o posts_array
    posts_array.forEach(e => {
        renderPost(
            e.title,
            e.title_link,
            e.image,
            e.image_alt,
            e.paragraph,
            e.id
        );
    });
});