/**
 * Capitaliza la primera letra de una cadena y convierte el resto en minúsculas.
 * @param str - La cadena a capitalizar.
 * @returns La cadena capitalizada.
 */
export function capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }