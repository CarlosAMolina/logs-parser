import { Component, OnInit } from '@angular/core';

import { IpVtAnalysis } from '../ip-vt-analysis';
import { IpVtAnalysisService } from '../ip-vt-analysis.service';
import { Log } from '../log';
import { LogFileStorageService } from '../log-file-storage.service';
import { LogService } from '../log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  ipsVtAnalysis: IpVtAnalysis[] = [];
  logs: Log[] = [];

  constructor(
    private ipVtAnalysisService: IpVtAnalysisService,
    private logService: LogService,
    public logFileStorageService: LogFileStorageService
  ) { }

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs(): void {
    this.logService.getLogs(this.logFileStorageService.logFile.path)
        .subscribe(logs => this.logs = logs);
  }

  getStringShortenedAsHtml(value: string): string {
    const maxLength = 50;
    let result = '';
    if (value.length < maxLength) {
        result = `<td>${value}</td>`;
    } else {
        result = `<td>${value.slice(0, maxLength)} <a href="${value}" title="${value}">(hover for full log)</a> </td>`;
    }
    return result;
  }

  getVtAnalysis() {
    this.ipVtAnalysisService.getIpsVtAnalysis(this.getIpsToAnalyzeInVt())
        .subscribe(ipsVtAnalysis => this.ipsVtAnalysis = ipsVtAnalysis);
  }

  private getIpsToAnalyzeInVt(): string[] {
    const result = this.logs.filter(this.isVtChecked).map(log => {
        return log.remoteAddr
    });
    return [...new Set(result)];
  }

  private isVtChecked(log: Log): boolean {
    return log.checkedVt === true;
  }

}
