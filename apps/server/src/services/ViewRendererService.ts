import * as ejs from "ejs";
import * as fs from "fs";
import juice from "juice";
import * as path from "path";

export class ViewRendererService {
  public static async render(
    templateName: string,
    data: Record<string, any>
  ): Promise<string> {
    const templatePath = path.join(
      `${__dirname}/../views`,
      `${templateName}.ejs`
    );
    const stylesPath = `${__dirname}/../public/css/styles.css`;
    return juice.inlineContent(
      await ejs.renderFile(templatePath, data),
      await fs.readFileSync(stylesPath, "utf8")
    );
  }
}
