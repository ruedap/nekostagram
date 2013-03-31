
$ ->
  # animation
  $('header > h1 > img').imagesLoaded ->
    $(this).show().addClass('is-animation-light-speed-in')
    $('header > ul > li').each (i, el)->
      $(this).addClass("is-animation-sparkle-y-#{i+1}")
    $('#is-pic-list-last-li').delay(1000).css(visibility: 'visible').hide().fadeIn()

  $('header > h1').click ->
    $(this).addClass('is-animation-hinge')

  # infinite scroll
  interval = 1000
  setInterval ->

    # 読み込みが必要な高さかどうかの判定
    power = 5
    docH = $(document).height()
    winH = $(window).height()
    scrT = $(window).scrollTop()
    restH  = docH - scrT - winH
    return unless restH < winH * power

    # 読み込み処理
    target = $('#js-pic-next-link')
    return if target.hasClass('js-pic-next-link-loding')
    nextURL = $('#js-pic-next-link').attr('href')
    target.addClass('js-pic-next-link-loding')
    $.ajax({
      type: 'GET',
      url: nextURL,
      dataType: 'json',
      scriptCharset: 'utf-8',
      success: (json)->
        setNewImages(json.data)
        setNewURL(nextURL, json.pagination.next_max_tag_id)
        target.removeClass('js-pic-next-link-loding')
      error: (a,b,c)->
        target.removeClass('js-pic-next-link-loding')
    })
  , interval

  setNewImages = (data)->
    $('#is-pic-list-last-li').hide()
    $.each data, (i, d)->
      obj= {}
      obj.link = d.link
      obj.url = d.images.low_resolution.url
      obj.text = if d.caption then $.trim(d.caption.text) else ''
      $html = $($.trim(JST['templates/home/pic_list_li'](obj)))
      $html.children('a').css(visibility: 'hidden')
      setCaptionListener($html)
      $('#js-pic-list').append($html)
    $('#is-pic-list-last-li').appendTo('#js-pic-list').show()

  setCaptionListener = ($html)->
    $html.imagesLoaded ->
      $(this).children('a').css(visibility: 'visible').hide().fadeIn()
      $(this).hover ->
        $(this).find('span').fadeIn()
      , ->
        $(this).find('span').fadeOut()

  setNewURL = (nextURL, tagId)->
    newURL = nextURL.replace(/(\=)(.+)$/, "$1#{tagId}")
    $('#js-pic-next-link').attr('href', newURL)

