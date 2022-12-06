import { Pipe, PipeTransform } from "@angular/core";
import { orderBy } from 'lodash';

@Pipe({
 name: "orderByy"
})
export class OrderByPipe implements PipeTransform {
 transform(array: any, sortBy: string, order?: string): any[] {
 const sortOrder = order ? order : 'desc'; // setting default ascending order

  return orderBy(array, [sortBy], [sortOrder]);
  }
}