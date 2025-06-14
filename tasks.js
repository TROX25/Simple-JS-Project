// sprawdzam czy mam jakies taski w local storage
if (!localStorage.getItem('tasks'))
{
    // jesli nie, to tworze pustą listę
    localStorage.setItem('tasks', JSON.stringify([]));
}

document.addEventListener('DOMContentLoaded', function()
{
    //Wyszarzam przycisk submit dopóki user nie zacznie czegos wpisywac
    document.querySelector('#submit').disabled = true;
    //kiedy user aktywuje okno wpisywania, wywołuję funkcję()
    document.querySelector('#task').onkeyup = function()
    {
        //jeżeli wywołał ale nic nie wpisał, to przycisk dalej wyszarzony
        if (document.querySelector('#task').value.length > 0)
        {
            document.querySelector('#submit').disabled = false;
        }
        //jeśli coś wpisał to umożliwiam submit
        else
        {
            document.querySelector('#submit').disabled = true;
        }
    }
    //Tworze funkcje która przy submicie doda nowe rzeczy do listy
    document.querySelector('#form_add').onsubmit = function()
    {
        //pobieram to co wpisał user
        const task = document.querySelector('#task').value;
        // tworze element listy i przypisuje do niego zmienna task
        const li = document.createElement('li');
        li.textContent = task;
        // kliknięcie taska usuwa go i updatuje storage
        li.onclick = function ()
        {
            li.remove();
            updateStorage();
        };

        // dodaje element listy do listy
        document.querySelector('#tasks').append(li);
        // dodaje element do local storage
            // do tasks przypisuje taski zapisane w pamieci przegladarki
        let tasks = JSON.parse(localStorage.getItem('tasks'));
            // dodaje tekst do tablicy w pamieci przegladarki
        tasks.push(task);
            // zamieniam tasks na format json i zapisuje w pamieci przegladarki
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // czyszcze boxa po submicie
        document.querySelector('#task').value = '';
        // z powrotem wyłączem możliwość sumbit po wcześniejszym sumbicie
        document.querySelector('#submit').disabled = true;
        return false;
    }

    function updateStorage()
    {
        // pobieram do items wszystkie li z listy tasks
        const items = document.querySelectorAll('#tasks li');
        // tworze pusta liste tasks
        const tasks = [];
        // przechodzi po wszyskich li
        items.forEach(function(li)
        {
            // dodaje do pustej listy tasks, całą zawartosc tekstową (li.textContent) z li
            tasks.push(li.textContent);
        });
        // zapisuje do local storage liste tasks w formacie json
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // dzięki temu przy odswierzeniu strony podczytuje zapisane w pamieci taski
        // zapisuje do saved tasks wszystkie taski z localStorage
    let savedTasks = JSON.parse(localStorage.getItem('tasks'));
        // petla przechodzi przez kazdy task (task jest zmienna tymczasową, równie dobrz moze byc abc123)
    savedTasks.forEach(task =>
    {
        // tworzy nowy element li
    const li = document.createElement('li');
        // wstawia tekst do li
    li.textContent = task;
        // przy kliknieciu usuwa task i zapisuje to w local storage
    li.onclick = function ()
        {
            li.remove();
            updateStorage();
        };
    document.querySelector('#tasks').append(li);
    });
})
