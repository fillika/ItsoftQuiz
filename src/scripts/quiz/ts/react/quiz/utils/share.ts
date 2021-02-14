export function shareVK(event: React.MouseEvent) {
  event.preventDefault();

  const url = encodeURIComponent(location.origin);
  const title = encodeURIComponent('Я прошел тест на ITSOFT');
  const metaIMG: HTMLMetaElement | null = document.querySelector('meta[property="og:image"]');
  let image;

  if (metaIMG) {
    image = encodeURIComponent(metaIMG.content);
  }

  const shareLink = 'https://vk.com/share.php?url=' + url + '&title=' + title + '&image=' + image;

  if (window.innerWidth >= 992) {
    sharer(shareLink);
  } else {
    window.open(shareLink);
  }
}

export function shareFB(event: React.MouseEvent) {
  event.preventDefault();

  const url = encodeURIComponent(location.origin);
  const title = encodeURIComponent('Я прошел тест на ITSOFT');
  const shareLink = 'http://www.facebook.com/sharer.php?u=' + url + '&t' + title;

  if (window.innerWidth >= 992) {
    sharer(shareLink);
  } else {
    window.open(shareLink);
  }
}

export function shareOK(event: React.MouseEvent) {
  event.preventDefault();

  const url = encodeURIComponent(location.origin);
  const title = encodeURIComponent('Я прошел тест на ITSOFT');
  const metaIMG: HTMLMetaElement | null = document.querySelector('meta[property="og:image"]');
  let image;

  if (metaIMG) {
    image = encodeURIComponent(metaIMG.content);
  }

  const shareLink = 'https://connect.ok.ru/offer?url=' + url + '&title=' + title + '&imageUrl=' + image;

  if (window.innerWidth >= 992) {
    sharer(shareLink);
  } else {
    window.open(shareLink);
  }
}

function sharer(link: string) {
  window.open(
    link,
    'sharer',
    'width=700,height=400,left=200,top=100,location=no, directories=no,status=no,toolbar=no,menubar=no'
  );
}
