export const numberWithCommas = (x) => {
    if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const classList = (classes) => {
    return Object
      .entries(classes)
      .filter(entry => entry[1])
      .map(entry => entry[0])
      .join(' ');
  }

  export function seo(data = {}) {
    data.title = data.title || 'Mercado Libre';
    data.metaDescription = data.metaDescription || 'La comunidad de compra y venta online más grande de América Latina.';
  
    document.title = data.title;
    document.querySelector('meta[name="description"]').setAttribute('content', data.metaDescription);
  }