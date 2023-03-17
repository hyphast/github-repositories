import './style.scss'

const repoTemplate = document.createElement('li')
repoTemplate.setAttribute('id', 'repositoryItem')
repoTemplate.setAttribute('class', 'repository__item')
repoTemplate.innerHTML = `
  <h2 class="repository__heading">
    <a href="https://github.com/alallier/reload" target="_blank"></a>
  </h2>
  <span class="repository__id"></span>
  <p class="repository__desc"></p>
`

const form = document.forms.search

form.addEventListener('submit', function (event) {
  event.preventDefault()

  if (!form.checkValidity()) return

  const result = document.getElementById('result')
  const submitBtn = form.elements.submitBtn

  submitBtn.disabled = true

  const searchValue = form.elements.search.value
  const q = encodeURIComponent(searchValue)

  fetch(
    `https://api.github.com/search/repositories?q=${q}+in:name&per_page=10&page=1`
  )
    .then((response) => response.json())
    .then((json) => {
      let repositories = []
      repositories = json.items.map((rep) => ({
        id: rep.id,
        full_name: rep.full_name,
        description: rep.description,
        html_url: rep.html_url,
      }))

      if (repositories.length === 0) {
        result.innerHTML = 'Ничего не найдено'
        return
      }

      const listContent = getListContent(repositories)
      result.innerHTML = listContent.outerHTML
    })
    .finally(() => {
      submitBtn.disabled = false
    })
})

function getListContent(list) {
  const listContainer = document.createElement('ul')
  listContainer.setAttribute('class', 'repository__list')

  for (let i = 0; i < list.length; i++) {
    const newRepositoryElement = repoTemplate.cloneNode(true)
    const repoNameElement = newRepositoryElement.querySelector(
      '.repository__heading > a'
    )
    const repoIdElement = newRepositoryElement.querySelector('.repository__id')
    const repoDescElement =
      newRepositoryElement.querySelector('.repository__desc')

    repoNameElement.textContent = list[i].full_name
    repoNameElement.href = list[i].html_url
    repoIdElement.textContent = 'ID: ' + list[i].id
    repoDescElement.textContent = list[i].description

    listContainer.append(newRepositoryElement)
  }

  return listContainer
}
