(function () {
  "use strict";

  var grid = document.getElementById("cardGrid");
  var emptyState = document.getElementById("emptyState");
  var searchInput = document.getElementById("searchInput");

  var GITHUB_MARK =
    "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 " +
    "0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 " +
    "1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 " +
    "0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 2-.27c.68 0 " +
    "1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 " +
    "3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A7.995 7.995 0 0 0 16 8c0-4.42-3.58-8-8-8z";

    function isValid(person) {
    return person && typeof person.name === "string" && person.name.trim() !== "" &&
      typeof person.username === "string" && person.username.trim() !== "";
  }

  function avatarUrl(username) {
    return "https://github.com/" + encodeURIComponent(username) + ".png?size=200";
  }

  function profileUrl(person) {
    if (typeof person.github === "string" && person.github.indexOf("http") === 0) {
      return person.github;
    }
    return "https://github.com/" + encodeURIComponent(person.username.trim());
  }

    function initialsAvatar(name) {
    var initials = name.trim().split(/\s+/).slice(0, 2).map(function (word) {
      return word.charAt(0).toUpperCase();
    }).join("");
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
      '<rect width="200" height="200" fill="#a371f7"/>' +
      '<text x="50%" y="50%" dy=".35em" text-anchor="middle" fill="#0d1117" ' +
      'font-family="sans-serif" font-size="84" font-weight="700">' + initials + "</text></svg>";
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }

  function buildCard(person) {
    var card = document.createElement("a");
    card.className = "card";
    card.href = profileUrl(person);
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("aria-label", person.name + " on GitHub");

    var img = document.createElement("img");
    img.className = "avatar";
    img.src = avatarUrl(person.username.trim());
    img.alt = person.name;
    img.loading = "lazy";
    img.width = 96;
    img.height = 96;
    img.addEventListener("error", function () {
      img.src = initialsAvatar(person.name);
    });
    card.appendChild(img);

    var name = document.createElement("h3");
    name.className = "card-name";
    name.textContent = person.name;
    card.appendChild(name);

    if (person.role) {
      var role = document.createElement("p");
      role.className = "card-role";
      role.textContent = person.role;
      card.appendChild(role);
    }

    if (person.description) {
      var desc = document.createElement("p");
      desc.className = "card-desc";
      desc.textContent = person.description;
      card.appendChild(desc);
    }

    if (Array.isArray(person.skills) && person.skills.length) {
      var tags = document.createElement("ul");
      tags.className = "tags";
      person.skills.slice(0, 6).forEach(function (skill) {
        var li = document.createElement("li");
        li.textContent = skill;
        tags.appendChild(li);
      });
      card.appendChild(tags);
    }

    var handle = document.createElement("span");
    handle.className = "card-handle";
    handle.innerHTML =
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="' + GITHUB_MARK + '"></path></svg>';
    var handleText = document.createElement("span");
    handleText.textContent = "@" + person.username.trim();
    handle.appendChild(handleText);
    card.appendChild(handle);

    return card;
  }

  function haystack(person) {
    return [
      person.name,
      person.username,
      person.role || "",
      person.description || "",
      Array.isArray(person.skills) ? person.skills.join(" ") : ""
    ].join(" ").toLowerCase();
  }

  var people = (typeof participants !== "undefined" ? participants : []).filter(function (person) {
    if (isValid(person)) { return true; }
    console.warn("Skipping an incomplete participant entry (needs `name` and `username`):", person);
    return false;
  });

  function render(query) {
    var term = (query || "").trim().toLowerCase();
    var matches = term === "" ? people : people.filter(function (person) {
      return haystack(person).indexOf(term) !== -1;
    });

    grid.textContent = "";
    var fragment = document.createDocumentFragment();
    matches.forEach(function (person) {
      fragment.appendChild(buildCard(person));
    });
    grid.appendChild(fragment);

    emptyState.hidden = matches.length !== 0;
  }

  render("");

  searchInput.addEventListener("input", function () {
    render(searchInput.value);
  });

})();
