export const PERMISSOES = {
  1: {
    pai: 0,
    icon: "fas fa-home",
    link: '/admin',
    descricao: "Inicio",
  }
};

export const getPermissoes = (ids = []) => {
  return ids.map((i) => ({ ...PERMISSOES[i], id: Number(i) }));
};

export const getAllPermissoes = () => {
  return Object.keys(PERMISSOES).map((i) => ({
    ...PERMISSOES[i],
    id: Number(i),
  }));
};

export const validaPermissao = (id, permissoes = []) => {
  if (Array.isArray(id)) {
    for (let p of permissoes) {
      for (let _id of id) {
        if (p == _id) return true;
      }
    }
  } else {
    for (let p of permissoes) {
      if (p == id) return true;
    }
  }
  return false;
};
