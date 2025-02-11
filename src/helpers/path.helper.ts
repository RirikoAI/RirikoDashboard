export const getCssSafePath = (path: string): string => {
  let cssSafePath;
  if (path === '/') {
    cssSafePath = 'root';
  } else {
    cssSafePath = path.replace(/\//g, "-").replace(/^-/, "");
  }
  
  cssSafePath += '-page';
  
  return cssSafePath;
}