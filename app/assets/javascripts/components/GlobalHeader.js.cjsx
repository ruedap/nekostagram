$ ->
  GlobalHeader = React.createClass
    propTypes:
      imagePath: React.PropTypes.string.isRequired
      imageTitle: React.PropTypes.string.isRequired
    render: ->
      <h1 className="GlobalHeader-heading">
        <a href="https://github.com/ruedap/nekostagram">
          <img src={@props.imagePath} alt={@props.imageTitle} title={@props.imageTitle} />
        </a>
      </h1>

  globalHeader = document.querySelector('.GlobalHeader')
  imagePath = globalHeader.dataset.headerImagePath
  imageTitle = globalHeader.dataset.headerImageTitle
  React.render(<GlobalHeader imagePath={imagePath} imageTitle={imageTitle} />, globalHeader)
