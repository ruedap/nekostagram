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
      setInterval ->
        InstagramClient.load()
      , 3000
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
      return if @_isLoading
      return unless isInfinitScroll()
      @_isLoading = true
      request
        .get(instagramNextUrl())
        .set
          Accept: 'application/json'
        .end (err, res) =>
          @_isLoading = false
          if res.ok
            attrList = _.map res.body.data, (item) ->
              pictureAttr(
                item.link,
                item.images.low_resolution.url,
                if item.caption then $.trim(item.caption.text) else '', # TODO: Avoid jQuery
                item.id
              )
            pl?.appendAttrList(attrList) # FIXME: Refactoring
            instagramNextUrl(res.body.pagination.next_max_tag_id) # FIXME: Refactoring
          else
            # FIXME: error handling
            console.log(err)

  # FIXME: Refactoring
  instagramNextUrl = do ->
    base = '/?max_tag_id='
    url  = '/'
    (nextMaxTagId) ->
      return url unless nextMaxTagId?
      url = base.replace(/(\=)(.*)$/, "$1#{nextMaxTagId}")

  isInfinitScroll = do ->
    requestCount = 0
    $(window).scroll ->
      requestCount = 0
    ->
      dh = $(document).height()
      wh = $(window).height()
      st = $(window).scrollTop()
      d  = dh - st - wh
      return false unless d < wh * 5
      return false if requestCount > 10
      requestCount += 1
      true



  # Entry point
  # ===========================================================================

  pl = React.render(<PictureList />, pictureList)
