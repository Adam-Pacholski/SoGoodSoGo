import { Component, OnInit } from '@angular/core';
import { FaqList } from 'src/app/interface/faqListInterface';
import { FaqServiceService } from 'src/app/services/faq-service.service';

@Component({
  selector: 'app-baza-faq-page',
  templateUrl: './baza-faq-page.component.html',
  styleUrls: ['./baza-faq-page.component.scss']
})
export class BazaFaqPageComponent implements OnInit {
  
  faqList : FaqList[] = [];
  faqElement: FaqList = {docID:'', id:0 , question:'', answer:'' };
  dlugosc: number = 0;
  show: number = -1;

  constructor(private faqS: FaqServiceService) {
    this.getList();
   }

  ngOnInit(): void {
  }
  getList(){
    this.faqS.getFaq().subscribe(items => {
      this.faqList = items;
      this.dlugosc = this.faqList.length;
    });
  }

  addQuestion(){
    this.faqElement.id = this.dlugosc+1;
    this.faqS.addFaq(this.faqElement);
  } 

  editQuestion(){
   // console.log(this.faqElement);
    this.faqS.editFaq(this.faqElement);
    this.faqElement = {docID:'', id:0 , question:'', answer:'' };

  }

  delete(){
    this.faqS.deleteFaq(this.faqElement);
    this.getList();
  }

  collapse(i: number){
    this.faqElement = this.faqList[i];
    if(this.show === i){
       this.show = -1;
       this.faqElement = {docID:'', id:0 , question:'', answer:'' };
    } else {
      this.show = i;
    }
  }

}
