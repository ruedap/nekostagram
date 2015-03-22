$ ->
  request = require('superagent')
  NOW_LOADING_KEY = 'NOW_LOADING_KEY'

  # Picture
  # ===========================================================================

  pictureAttr = (link, src, text, key) ->
    { link: link, src: src, text: text, key: key}

  pictureList = document.querySelector("#js-picture-list")

  Picture = React.createClass
    propTypes:
      link: React.PropTypes.string
      src: React.PropTypes.string.isRequired
      text: React.PropTypes.string
    render: ->
      <div className="Picture">
        <a className="Picture-link" href={@props.link} target="_blank">
          <img className="Picture-image" src={@props.src} text={@props.text} />
        </a>
      </div>

  # PictureList
  # ===========================================================================

  PictureList = React.createClass
    getInitialState: ->
      _loadingImagePath = pictureList.dataset.loadingImagePath
      _initialAttrList = [pictureAttr(null, _loadingImagePath, 'Now Loading...', NOW_LOADING_KEY)]
      attrList: _initialAttrList
    appendAttrList: (list) ->
      i = _.findIndex @state.attrList, (item) -> item?.key is NOW_LOADING_KEY
      nl = @state.attrList.splice(i, 1)
      @setState
        attrList: _.union(@state.attrList, list, nl)
    componentDidMount: ->
      InstagramClient.load()
      # setInterval ->
      #   InstagramClient.load()
      # , 3000
    render: ->
      <ul className="PictureList">
        { _.map @state.attrList, (item) ->
          <li className="PictureList-item" key={item.key}>
            <Picture src={item.src} link={item.link} text={item.text} />
          </li>
        }
      </ul>

  # InstagramClient
  # ===========================================================================

  InstagramClient =
    _isLoading: false
    load: =>
      @_isLoading = true
      request
        .get('/')
        .set
          Accept: 'application/json'
        .end (err, res) ->
          if res.ok
            attrList = _.map res.body.data, (item) ->
              pictureAttr(
                item.link,
                item.images.low_resolution.url,
                if item.caption then $.trim(item.caption.text) else '',
                item.id
              )
            pl?.appendAttrList(attrList)
          else
            # FIXME: error handling
            console.log(err)

  # Entry point
  # ===========================================================================

  pl = React.render(<PictureList />, pictureList)
