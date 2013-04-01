
$ ->
  baseAjaxURL = '/?max_tag_id='
  isLoading = false

  # Rails.env
  isDev = if $('body').data('rails-env') == 'development' then true else false

  # SVG fallback (use Modernizr)
  unless Modernizr.svg
    $('img[src$=".svg"]').attr 'src', ->
      $(this).attr('src').replace('.svg', '.png')

  # animation
  $('header > h1 > img').imagesLoaded ->
    $(this).show().addClass('is-animation-light-speed-in')
    $('header > ul > li').each (i, el)->
      $(this).addClass("is-animation-sparkle-y-#{i+1}")
    $('#is-pic-list-last-item').delay(1000).css(visibility: 'visible').hide().fadeIn()

  $('header > h1').click ->
    $(this).addClass('is-animation-hinge')

  # infinite scroll
  interval = 1000
  setInterval ->

    # judgment
    power = 5
    docH = $(document).height()
    winH = $(window).height()
    scrT = $(window).scrollTop()
    restH  = docH - scrT - winH
    return unless restH < winH * power

    # ajax loading
    ajaxLoading()
  , interval

  ajaxLoading = ->
    return if isLoading
    isLoading = true
    $.ajax({
      type: 'GET',
      url: nextAjaxURL(),
      dataType: 'json',
      scriptCharset: 'utf-8',
      success: (json)->
        addNewImages(json.data)
        nextAjaxURL(json.pagination.next_max_tag_id)
        isLoading = false
      error: (a,b,c)->
        isLoading = false
    })

  nextAjaxURL = (->
    _base = baseAjaxURL
    _url = '/'
    (next_max_tag_id)->
      return _url unless next_max_tag_id?
      _url = _base.replace(/(\=)(.*)$/, "$1#{next_max_tag_id}")
  )()

  addNewImages = (data)->
    $('#is-pic-list-last-item').hide()
    spamCount = 0
    _(data).each (d)->
      if spamFilter(d)
        spamCount += 1
        return true
      obj= {}
      obj.link = d.link
      obj.url = d.images.low_resolution.url
      obj.text = if d.caption then $.trim(d.caption.text) else ''
      $html = $($.trim(JST['templates/home/pic_list_item'](obj)))
      $html.children('a').css(visibility: 'hidden')
      addImageLoadedListener($html)
      $('#js-pic-list').append($html)
    console.log("#{spamCount} / #{data.length}") if isDev
    $('#is-pic-list-last-item').appendTo('#js-pic-list').show()

  spamTagThreshold = 30
  spamTagNames = [ 'support', 'skin', 'random', 'shadow', 'fashion' ]
  spamFilter = (d)->
    isSpam = false
    if d.tags.length >= spamTagThreshold
      console.log("Threshold: " + d.link) if isDev
      return true
    _(spamTagNames).each (tag)->
      if _(d.tags).include(tag)
        console.log("Tag: " + d.link) if isDev
        isSpam = true
    if isSpam then true else false

  addImageLoadedListener = ($html)->
    $html.imagesLoaded ->
      $(this).children('a').css(visibility: 'visible').hide().fadeIn()
      $(this).hover ->
        $(this).find('span').fadeIn()
      , ->
        $(this).find('span').fadeOut()

