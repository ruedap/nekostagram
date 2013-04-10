
$ ->

  # Rails.env
  isDev = if $('body').data('rails-env') == 'development' then true else false

  # SVG fallback (use Modernizr)
  unless Modernizr.svg
    $('img[src$=".svg"]').attr 'src', ->
      $(this).attr('src').replace('.svg', '.png')

  # jQuery object
  $headerName = $('#js-header-name')
  $picList = $('#js-pic-list')
  $picListLastItem = $('#is-pic-list-last-item')


  # animation
  $headerName.find('img').imagesLoaded ->
    $(this).show().addClass('is-animation-light-speed-in')
    $('#js-profile-list').find('li').each (i, el)->
      $(this).addClass("is-animation-sparkle-y-#{i+1}")
    $picListLastItem.delay(1000).css(visibility: 'visible').hide().fadeIn()

  $headerName.hover ->
    $(this).addClass('is-animation-wiggle')
  , ->
    $(this).removeClass('is-animation-wiggle')

  $headerName.click ->
    $(this)
      .unbind('mouseenter').unbind('mouseleave')
      .removeClass('is-animation-wiggle')
      .addClass('is-animation-hinge')

  # infinite scroll
  baseAjaxURL = '/?max_tag_id='
  isAjaxLoading = false
  ajaxCount = 0
  ajaxInterval = 1000
  setInterval ->
    # judgment
    _power = 5
    _docH  = $(document).height()
    _winH  = $(window).height()
    _scrT  = $(window).scrollTop()
    _restH = _docH - _scrT - _winH
    return unless _restH < _winH * _power
    return if ajaxCount > 30
    return if isAjaxLoading

    # reset ajaxCount
    $(window).scroll ->
      ajaxCount = 0

    # ajax loading
    ajaxLoading()
  , ajaxInterval

  ajaxLoading = ->
    ajaxCount += 1
    isAjaxLoading = true
    $.ajax({
      type: 'GET',
      url: nextAjaxURL(),
      dataType: 'json',
      scriptCharset: 'utf-8',
      success: (json)->
        addNewImages(json.data)
        nextAjaxURL(json.pagination.next_max_tag_id)
        isAjaxLoading = false
      error: (a,b,c)->
        isAjaxLoading = false
    })

  nextAjaxURL = do ->
    _base = baseAjaxURL
    _url = '/'
    (next_max_tag_id)->
      return _url unless next_max_tag_id?
      _url = _base.replace(/(\=)(.*)$/, "$1#{next_max_tag_id}")

  addNewImages = (data)->
    $picListLastItem.hide()
    spamCount = 0
    _(data).each (d)->
      if spamFilter(d)
        spamCount += 1
        return true
      _obj= {}
      _obj.link = d.link
      _obj.url = d.images.low_resolution.url
      _obj.text = if d.caption then $.trim(d.caption.text) else ''
      $html = $($.trim(JST['templates/home/pic_list_item'](_obj)))
      $html.children('a').css(visibility: 'hidden')
      addImageLoadedListener($html)
      $picList.append($html)
    console.log("#{spamCount} / #{data.length}") if isDev
    $picListLastItem.appendTo($picList).show()

  ignoreTagNames = [
    'support', 'skin', 'random', 'shadow', 'fashion', 'perfect', 'crazy',
    'all_shots'
  ]
  tagCountThreshold = 30
  spamFilter = (d)->
    _isSpam = false
    if d.tags.length >= tagCountThreshold
      console.log("Threshold: " + d.link) if isDev
      return true
    _(ignoreTagNames).each (tag)->
      if _(d.tags).include(tag)
        console.log("Tag: " + d.link) if isDev
        _isSpam = true
    if _isSpam then true else false

  addImageLoadedListener = ($html)->
    $html.imagesLoaded ->
      $(this).children('a').css(visibility: 'visible').hide().fadeIn()
      $(this).hover ->
        $(this).find('span').fadeIn()
      , ->
        $(this).find('span').fadeOut()

